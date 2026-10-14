import React, { useState, useEffect } from 'react';
import { FaSortDown, FaFilter, FaRedo, FaSignOutAlt, FaFilePdf,FaCheck,FaTimes, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import backvideo from '../assets/dashboard.jpg';
const eventOptions = ['All Time', 'Code Raze', 'Hackathon', 'Aerial Adrenaline', 'Circuit X','Digital Art' ,'Bug Hunt','Animation','BGMI','MLBB','Free Fire','3D Modelling','Clash of Wheels','Tech Crisis','Infinity Hunt'];
const statusOptions = ['All', 'Pending', 'Accepted', 'Rejected'];
const API_URL = 'https://tech-avinya-backend.onrender.com' || 'http://localhost:8080';
const getSessionData = () => {
    const itemStr = localStorage.getItem('admin_session');
    
    if (!itemStr) {
        return null;
    }
    
    const item = JSON.parse(itemStr);
    const now = new Date();
    
    // Check expiration time
    if (now.getTime() > item.expiry) {
        // Session expired: Clear storage and deny access
        localStorage.removeItem('admin_session');
        return null;
    }
    
    // Session is valid
    return item.value;
};
export default function AdminDashboard() {
    const navigate = useNavigate();
    const [registrations, setRegistrations] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterEvent, setFilterEvent] = useState('All Time');
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortBy, setSortBy] = useState('latest'); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [previewData, setPreviewData] = useState(null);
    const [isImageZoomed, setIsImageZoomed] = useState(false);

    // --- Authentication Check (on component mount) ---
    useEffect(() => {
        const sessionData = getSessionData(); 
        if (!sessionData) {
            // Enforce login if session is expired or missing
            navigate('/login', { replace: true }); 
        }
        fetchRegistrationData();
    }, []);

    // --- Filtering and Sorting Effect ---
    useEffect(() => {

        applyFiltersAndSort(registrations);

         }, [filterEvent,filterStatus, sortBy, registrations]);


    const fetchRegistrationData = async () => {
        setLoading(true);
        setError(null);

        const API_ENDPOINT = '/api/admin/registrations';
        const token = getSessionData(); 
        try {
            // Replace with your actual secure fetch call to the backend
            const response = await fetch(API_URL + API_ENDPOINT, { method: 'GET' }); 

            if (!response.ok) {
                if (response.status === 401) {
                    handleLogout();
                    throw new Error('Unauthorized');
                }
                // If the server returns a 404, 500, or 401
                throw new Error('Failed to fetch data. Status: ' + response.status);
            }

            const data = await response.json();
            
            // Assuming the API returns an object with a 'registrations' key
            setRegistrations(data.registrations || data); 
            
        } catch (error) {
            console.error("Failed to fetch data from Atlas:", error);
            if (error.message !== 'Unauthorized') {
                setError("Access Denied or Server Connection Failed.");
            }
            setRegistrations([]);
        } finally {
            setLoading(false);
        }
    };

    const applyFiltersAndSort = (data) => {
        let filtered = data;

        if (filterEvent !== 'All Time') {
            filtered = filtered.filter(item => item.eventTitle === filterEvent);
        }
        if (filterStatus !== 'All') {
             filtered = filtered.filter(item => item.status === filterStatus);
        }
        
        filtered.sort((a, b) => {
            const dateA = new Date(a.registrationTime);
            const dateB = new Date(b.registrationTime);
            if (sortBy === 'latest') return dateB - dateA;
            if (sortBy === 'oldest') return dateA - dateB;
            return 0;
        });

        setFilteredData(filtered);
    };
    const handleStatusUpdate = async (id, newStatus) => {
    // 1. User confirmation check
    if (!window.confirm(`Are you sure you want to change the status to "${newStatus}"?`)) {
        return;
    }
    
    // NOTE: Assuming API_URL and fetchRegistrationData() are defined in the component scope
    const API_ENDPOINT = `/api/admin/registration/status/${id}`;

    try {
        // 2. Perform the PUT request and assign it to the 'response' variable
        const response = await fetch(API_URL + API_ENDPOINT, { 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });

        // 3. Handle non-OK status codes (e.g., 400, 404, 500)
        if (!response.ok) {
            const errorData = await response.json();
            // Throw a new error to jump to the catch block
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        // 4. Success: Refresh Data
        await fetchRegistrationData(); 

    } catch (e) {
        // 5. Display failure message based on the error received
        if (e.message.includes('HTTP error')) {
             alert(`Update Failed: ${e.message}`);
        } else {
             alert(`Could not connect to the server. Please check your network.`);
             console.error("Network Error:", e);
        }
    }
};

    const handlePreview = (item) => {
        setPreviewData(item);
        setIsImageZoomed(false);
    };
    const formatTimestamp = (isoString) => {
        if (!isoString) return 'N/A';
        return new Date(isoString).toLocaleString();
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_session'); // Clear the 2-day session
        window.dispatchEvent(new Event('authStatusChange'));
        navigate('/login'); 
    };
    
    const handleDownloadPDF = () => {
    if (filteredData.length === 0) {
        alert("No data to export.");
        return;
    }

    const doc = new jsPDF();
    const title = `Tech Avinya Registration Report: ${filterEvent}`;
    
    const headers = [
        ['ID', 'Event', 'Leader', 'College', 'Registered At']
    ];
    
    // The mapping logic remains the same
    const data = filteredData.map(item => [
        item.registrationId,
        item.eventTitle,
        item.leaderName,
        item.college,
        formatTimestamp(item.registrationTime)
    ]);

    doc.setFontSize(16);
    doc.text(title, 14, 20); 

    // 🎯 FIX: Call the imported autoTable function, passing the doc object
    autoTable(doc, {
        startY: 25,
        head: headers,
        body: data,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2, textColor: [50, 50, 50] },
        headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [240, 240, 240] }
    });

    doc.save(`${filterEvent.replace(' ', '_')}_registrations.pdf`);
  };
  const getStatusColor = (status) => {
        switch (status) {
            case 'Accepted': return 'text-green-500 bg-green-500/10 border-green-500';
            case 'Rejected': return 'text-red-500 bg-red-500/10 border-red-500';
            default: return 'text-yellow-500 bg-yellow-500/10 border-yellow-500';
        }
    };


    return (
        <div className="min-h-screen pt-24 pb-16  text-white px-4 md:px-10 print:pt-0">
            <img
                    className="fixed inset-0 w-screen h-screen object-cover z-[-1]"
                    src={backvideo}
                  />
                  
            <header className="flex justify-between items-center mb-8 max-w-7xl mx-auto print:hidden">
                <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-400 font-anton tracking-wide">
                    Registration Dashboard
                </h1>
                <button onClick={handleLogout} className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-300">
                    <FaSignOutAlt />
                    <span className="text-sm font-semibold">Logout</span>
                </button>
            </header>


            {/* Filter and Sort Bar (Modern Card Style) */}
            <div className="bg-gray-800/50 p-4 rounded-xl shadow-lg border border-cyan-700/50 mb-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 print:hidden">
                
                {/* Event Filter */}
                <div className="flex items-center space-x-3 w-full md:w-auto">
                    <FaFilter className="text-teal-400" />
                    <label className="text-gray-400 whitespace-nowrap text-sm">Filter by Event:</label>
                    <select 
                        value={filterEvent}
                        onChange={(e) => setFilterEvent(e.target.value)}
                        className="p-2 rounded-lg bg-gray-700/80 border border-cyan-500/50 text-sm focus:ring-cyan-500 w-full md:w-40"
                    >
                        {eventOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                 {/* Status Filter */}
                    <div className="flex items-center space-x-3 w-full md:w-auto">
                        <FaFilter className="text-teal-400" />
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="p-2 rounded-lg bg-gray-700/80 border border-cyan-500/50 text-sm focus:ring-cyan-500 w-full md:w-40">
                            {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                {/* Sort Option */}
                <div className="flex items-center space-x-3 w-full md:w-auto">
                    <FaSortDown className="text-teal-400" />
                    <label className="text-gray-400 whitespace-nowrap">Sort by Date:</label>
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="p-2 rounded-lg bg-gray-700/50 border border-cyan-500/50 text-sm focus:ring-cyan-500 w-full md:w-40"
                    >
                        <option value="latest">Latest Registration</option>
                        <option value="oldest">Oldest Registration</option>
                    </select>
                </div>
                
                {/* Print and Download Buttons */}
                <div className="flex space-x-3">
                    <button onClick={fetchRegistrationData} className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 flex items-center space-x-2 border border-cyan-400/50 p-2 rounded-lg">
                    <FaRedo />
                    <span className="text-sm">Refresh Data</span>
                </button>
                    <button onClick={handleDownloadPDF} className="text-red-400 hover:text-red-300 transition-colors duration-300 flex items-center space-x-2 border border-red-400/50 p-2 rounded-lg">
                        <FaFilePdf />
                        <span className="text-sm">Download PDF</span>
                    </button>
                </div>
            </div>

            {/* Registration Table */}
            <div className="bg-gray-800/60 rounded-lg shadow-2xl overflow-x-auto border border-blue-700/50 max-w-7xl mx-auto">
                {/* Status messages and loading indicators are also hidden on print by necessity */}
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-700/80 text-cyan-400 uppercase text-sm leading-normal font-bold ">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Event</th>
                            <th className="py-3 px-6 text-left">Leader</th>
                            <th className="py-3 px-6 text-left">College</th>
                            <th className="py-3 px-6 text-center">Registered At</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4 text-center print:hidden">Actions</th>
                            <th className="py-3 px-4 text-center print:hidden">Details</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300 text-sm font-ligh">
    {/* Conditional Rendering Block */}
    {error ? (
        // FIX 1: Error Row (Uses static key)
        <tr key="error-msg">
            <td colSpan="5" className="py-6 text-center text-red-400 font-mono">
                Error: {error}
            </td>
        </tr>
    ) : loading ? (
        // FIX 2: Loading Row (Uses static key)
        <tr key="loading-msg" >
            <td colSpan="5" className="py-6 text-center text-lg text-cyan-400 font-mono">
                Loading data from MongoDB Atlas...
            </td>
        </tr>
    ) : filteredData.length === 0 ? (
        // FIX 3: Empty Data Message (Uses static key)
        <tr key="no-data-row">
            <td colSpan="5" className="py-6 text-center text-gray-500">No registrations found for the current filter.</td>
        </tr>
    ) : (
        // Data Rows (Correctly mapped with item.id as key)
        filteredData.map(item => (
            <tr key={item._id} className="border-b border-gray-700/50 hover:bg-gray-700/40 ">
                <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">{item.registrationId}</td>
                <td className="py-3 px-6 text-left">{item.eventTitle}</td>
                <td className="py-3 px-6 text-left text-teal-400 ">{item.leaderName}</td>
                <td className="py-3 px-6 text-left">{item.college}</td>
                <td className="py-3 px-6 text-center text-xs font-mono ">{formatTimestamp(item.registrationTime)}</td>
                <td className="py-3 px-4 text-center">
                    <span className={`p-1 px-3 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                    {item.status}
                </span>
                </td>
                                        
                                        {/* Actions (Accept/Reject) */}
                <td className="py-3 px-4 text-center ">
                            {/* The status check must be reliable */}
                            {item.status === 'Pending' && (
                                <div className="flex space-x-6 text-lg justify-center">
                                    <button onClick={() => handleStatusUpdate(item._id, 'Accepted')} className="text-green-500 hover:text-green-400"><FaCheck /></button>
                                    <button onClick={() => handleStatusUpdate(item._id, 'Rejected')} className="text-red-500 hover:text-red-400"><FaTimes /></button>
                                </div>
                            )}
                        </td>
                                        
                                        {/* Details */}
                <td className="py-3 px-4 text-center ">
                    <button onClick={() => handlePreview(item)} className="text-cyan-400 hover:text-cyan-300"><FaEye /></button>
                </td>
            </tr>
        ))
    )}
</tbody>
                </table>
            </div>
            <p className="mt-4 text-sm text-gray-500 text-right max-w-7xl mx-auto ">Total Entries: {registrations.length}</p>
{/* Full Details Modal (Preview) */}
            {previewData && (
                <div className="absolute mt-18 inset-0 z-50 flex items-center justify-center  p-4">
                    <div className="bg-gray-700/95 border border-cyan-700/50 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
                        <div className="flex justify-between items-start">
                            <h2 className="text-2xl font-bold text-cyan-400">{previewData.teamName}</h2>
                            <button onClick={() => setPreviewData(null)} className="text-gray-400 hover:text-white text-3xl">&times;</button>
                        </div>
                        
                        {/* Image Section */}
                        <div className="w-full border-b border-gray-700 pb-4">
                            <h3 className="text-lg font-bold text-gray-300 mb-2">Payment Screenshot</h3>
                            <img 
                                src={previewData.imageUrl} 
                                alt={`${previewData.teamName} Team`}
                                onClick={() => setIsImageZoomed(true)} // Click to zoom
                                className="w-full h-auto max-h-48 object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                            />
                        </div>
                        
                        {/* Details Section */}
            <div className="border-t border-gray-700 pt-4 space-y-2 text-left">
                {/* Standard Leader Data */}
                <p className="text-sm"><span className="font-semibold text-gray-400">Leader:</span> <span className="text-teal-400">{previewData.leaderName}</span></p>
                <p className="text-sm"><span className="font-semibold text-gray-400">Registration ID:</span> {previewData.registrationId}</p>
                <p className="text-sm"><span className="font-semibold text-gray-400">College:</span> {previewData.college}</p>
                <p className="text-sm"><span className="font-semibold text-gray-400">Roll No (Leader):</span> {previewData.rollNumber}</p>
                <p className="text-sm"><span className="font-semibold text-gray-400">Email:</span> {previewData.email}</p>
                <p className="text-sm"><span className="font-semibold text-gray-400">Contact:</span> {previewData.phone}</p>
                <p className="text-sm"><span className="font-semibold text-gray-400">Payment Amount:</span> ₹ {previewData.paymentAmount}.00</p>
                <p className="text-sm"><span className="font-semibold text-gray-400">Status:</span> <span className={`p-1 px-2 rounded-lg text-xs font-semibold ${getStatusColor(previewData.status)}`}>{previewData.status}</span></p>
                <p className="text-sm"><span className="font-semibold text-gray-400">Time:</span> {formatTimestamp(previewData.registrationTime)}</p>
            </div>

                        {/* Team Members List (ITERATING OVER STRUCTURED OBJECTS) */}
            <div className="mt-4 border-t border-gray-700 pt-4">
                <h3 className="text-lg font-bold text-gray-300 mb-2">Team Members:</h3>
                <ul className="list-disc list-inside text-sm text-gray-400 ml-4 space-y-1">
                    {previewData.teamMembers && previewData.teamMembers.map((member, index) => (
                        <li key={index}>
                            {/* Check if fields exist before displaying */}
                            <strong>{member.name || `Member ${index + 1}`}:</strong>
                            {(member.rollNumber || member.inGameID) && (
                                <span className="ml-2 text-gray-500">
                                    (
                                    {member.rollNumber && `Reg No: ${member.rollNumber}`}
                                    {member.inGameID && ` | ID: ${member.inGameID}`}
                                    )
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
                        {previewData.status === 'Pending' && (
    <div className="mt-6 border-t border-gray-700 pt-4 flex space-x-6 text-lg justify-center">
        
        {/* Accept Button */}
        <div className="flex items-center space-x-2">
            <p className="text-gray-400 text-sm">Accept:</p>
            <button 
                onClick={() => handleStatusUpdate(previewData._id, 'Accepted')} 
                className="text-green-500 hover:text-green-400 p-2 rounded-full bg-green-900/30 transition-colors"
            >
                <FaCheck />
            </button>
        </div>

        {/* Reject Button */}
        <div className="flex items-center space-x-2">
            <p className="text-gray-400 text-sm">Reject:</p>
            <button 
                onClick={() => handleStatusUpdate(previewData._id, 'Rejected')} 
                className="text-red-500 hover:text-red-400 p-2 rounded-full bg-red-900/30 transition-colors"
            >
                <FaTimes />
            </button>
        </div>
    </div>
)}
                    </div>
                </div>
            )}
            
            {/* Full Screen Image Zoom Modal (Separate Component) */}
            {isImageZoomed && (
    <div 
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 cursor-zoom-out"
        // Close modal when clicking the backdrop
        onClick={() => setIsImageZoomed(false)} 
    >
        {/* Close Button (X icon) - NEW ADDITION */}
        <button
            // Use stopPropagation to prevent the button click from immediately bubbling up
            // and triggering the parent div's onClick (which would close the modal twice).
            onClick={(e) => { e.stopPropagation(); setIsImageZoomed(false); }}
            className="absolute top-4 right-4 text-white text-4xl p-2 rounded-full hover:bg-white/20 transition-all cursor-pointer z-[70]"
            aria-label="Close image viewer"
        >
            &times;
        </button>

        <img 
            src={previewData.imageUrl} 
            alt="Zoomed Team Photo" 
            // NOTE: Changing class name here to reflect the actual data source
            // src={previewData.imageUrl} 
            className="max-w-[90vw] max-h-[90vh] object-contain cursor-default"
            // Stop propagation on the image itself so clicking it doesn't close the modal immediately
            onClick={(e) => e.stopPropagation()} 
        />
    </div>
)}
        </div>
    );
}