import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import VantaGlobeBackground from '../components/VantaGlobeBackground'; // Assuming VantaGlobeBackground is used

// NOTE: Add all 15 events here. Only min/max members, fees, and titles are critical.
const allEventsData = [
{ id: "code", title: "Code Raze", minMembers: 1, maxMembers: 1, feeNIT: "₹ 99/-", feeOutside: "₹ 250/-", },
{ id: "digital", title: "Digital Art", minMembers: 1, maxMembers: 1, feeNIT: "₹ 99/-", feeOutside: "₹ 250/-",},
{ id: "aerial", title: "Aerial Adrenaline", minMembers: 2, maxMembers: 4, feeNIT: "₹ 0/-", feeOutside: "₹ 500/-",},
{ id: "clash", title: "Clash of Wheels", minMembers: 1, maxMembers: 4, feeNIT: "₹ 199/-", feeOutside: "₹ 400/-", },
{ id: "bug", title: "Bug Hunt", minMembers: 1, maxMembers: 1 , feeNIT: "₹ 99/-", feeOutside: "₹ 250/-", },
{ id: "hackathon", title: "Hackathon", minMembers: 3, maxMembers: 5, feeNIT: "₹ 200/-",  feeOutside: "₹ 600/-",},
{ id: "animation", title: "Animation", minMembers: 3, maxMembers: 5, feeNIT: "₹ 99/-", feeOutside: "₹ 300/-", },
{ id: "bgmi", title: "BGMI" ,minMembers: 4, maxMembers: 4, feeNIT: "₹ 500/-", feeOutside: "₹ 1000/-",},
{ id: "mlbb", title: "MLBB" ,minMembers: 5, maxMembers: 5, feeNIT: "₹ 500/-", feeOutside: "₹ 1000/-",},
{ id: "free", title: "Free Fire" ,minMembers: 4, maxMembers: 4 , feeNIT: "₹ 500/-", feeOutside: "₹ 600/-",},
{ id: "modelling", title: "3D Modelling" , minMembers: 1, maxMembers: 1 , feeNIT: "₹ 99/-", feeOutside: "₹ 300/-",},
{ id: "tech", title: "Tech Crisis" , minMembers: 3, maxMembers: 3, feeNIT: "₹ 99/-", feeOutside: "₹ 300/-",},
{ id: "infinity", title: "Infinity Hunt" , minMembers: 1, maxMembers: 1, feeNIT: "₹ 99/-", feeOutside: "₹ 300/-",},
{ id: "stock", title: "Stock Rise" , minMembers: 1, maxMembers: 1, feeNIT: "₹ 99/-", feeOutside: "₹ 199/-",},
];
const ESPORTS_EVENTS = ['bgmi', 'mlbb', 'free'];
// NOTE: You must use import.meta.env.VITE_API_BASE_URL in a real app
const API_URL = 'https://tech-avinya-backend.onrender.com'||'http://localhost:8080';
const QR_CODE_PATH = '/qr.jpg'; // Path to the local QR code image


export default function RegistrationForm() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const event = allEventsData.find(e => e.id === eventId);
    const eventTitle = event ? event.title : 'Selected Event';
    
    // Derived states
    const isTeamEvent = event ? event.maxMembers > 1 : false;
    const requiresGameId = ESPORTS_EVENTS.includes(eventId); 

    // --- STATE INITIALIZATION ---
    const [selectedCollegeType, setSelectedCollegeType] = useState('Other College/University'); 
    const [formData, setFormData] = useState({ /* Tracks main inputs via onChange */ });
    
    const initialMemberStructure = { name: '', rollNumber: '', inGameID: '' };
    const [teamMembers, setTeamMembers] = useState(
        // Initialize members array (minMembers - 1 for team, 0 for individual)
        Array.from({ length: isTeamEvent ? (event?.minMembers - 1) : 0 }).map(() => ({ ...initialMemberStructure }))
    );
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(null); 
    
    // --- UTILITIES ---

    // Handler for standard leader/contact inputs
    const handleLeaderChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handler for dynamic team member inputs
    const handleMemberChange = (index, field, value) => {
        const newMembers = [...teamMembers];
        newMembers[index][field] = value;
        setTeamMembers(newMembers);
    };

    // Handler for adding new member slots
    const handleAddMember = () => {
        if (teamMembers.length < (event?.maxMembers - 1 || 3)) {
            const newMember = { name: '', rollNumber: '', inGameID: '' };
            setTeamMembers([...teamMembers, newMember]);
        }
    };

    // --- SUBMISSION LOGIC ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage(null);

        const formElement = e.target;
        const data = new FormData(formElement);

        // 1. Prepare dynamic/calculated fields for backend
        data.append('eventId', eventId);
        data.append('eventTitle', eventTitle);
        data.append('college', selectedCollegeType);
        
        // 2. Prepare structured team members array (JSON string)
        const cleanMembers = teamMembers
            .filter(memberObj => memberObj.name && memberObj.name.trim() !== '')
            .map(memberObj => ({
                name: memberObj.name.trim(),
                rollNumber: memberObj.rollNumber ? memberObj.rollNumber.trim() : '',
                inGameID: memberObj.inGameID ? memberObj.inGameID.trim() : ''
            }));
        data.append('teamMembers', JSON.stringify(cleanMembers)); 

        const API_ENDPOINT = '/api/register';

        try {
            const response = await fetch(API_URL + API_ENDPOINT, { 
                method: 'POST',
                body: data, // FormData is sent directly
            });

            const result = await await response.json();

            if (response.ok) {
                const finalMsg = result.message.includes('Registration successful!') ? result.message : `Registration successful! ${result.message}`;
                setSubmitMessage({ type: 'success', text: finalMsg });
                
                // Reset Form and Redirect
                formElement.reset(); 
                setTeamMembers(Array.from({ length: isTeamEvent ? (event?.minMembers - 1 || 1) : 0 }).map(() => ({ ...initialMemberStructure })));
                
                setTimeout(() => {
                    navigate('/events'); 
                }, 200000); 
            } else {
                setSubmitMessage({ type: 'error', text: result.message || 'Submission failed. Please check server logs.' });
            }
        } catch (error) {
            setSubmitMessage({ type: 'error', text: 'Could not connect to the server. Check your network.' });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // --- Styling Constants ---
    const inputClass = "w-full p-3 rounded-lg bg-gray-800/80 border border-gray-700 Gluten text-white placeholder-gray-500 transition-all duration-300 focus:border-cyan-500 focus:ring-0 focus:shadow-lg focus:shadow-cyan-500/30";
    const labelClass = "block text-sm font-medium Graduate text-cyan-400 mb-2 tracking-wider uppercase";
    const fieldsetClass = "border border-cyan-700/50 p-6 rounded-lg space-y-6 shadow-inner shadow-cyan-900/40";
    const legendClass = "px-3 text-lg font-extrabold Graduate text-cyan-300 font-anton uppercase";

    return (
        <div className="relative min-h-screen pt-32 pb-16 text-white flex flex-col items-center">
            <VantaGlobeBackground />
            {/* Background Overlay */}
            <div className="fixed inset-0 z-0 "></div>
            
            <div className="relative z-10 max-w-3xl w-full mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-extrabold Graduate text-cyan-400 mb-2 font-anton text-center">
                Register for {eventTitle}
                </h1>
                <p className="text-lg text-gray-400 mb-8 text-center Gluten">Secure your spot in the competition.</p>

                {/* --- Registration Form Card --- */}
                <form onSubmit={handleSubmit} className="bg-gray-900/60 p-8 md:p-12 rounded-xl shadow-2xl shadow-cyan-500/30 border border-blue-700/50 space-y-10">
                
                {submitMessage && (
                    <div className={`p-4 rounded-lg font-semibold ${submitMessage.type === 'success' ? 'bg-green-600/50 border-green-400' : 'bg-red-600/50 border-red-400'} border text-center`}>
                    <div dangerouslySetInnerHTML={{ __html: submitMessage.text }} />
                    </div>
                )}

                {/* QR CODE AND FEE DISPLAY */}
                <div className="flex flex-col items-center space-y-4 pt-4 border-b border-cyan-700/50 pb-8">
                    <h2 className={legendClass}>Payment Instructions</h2>
                    <img src={QR_CODE_PATH} alt="UPI QR Code" className="w-40 h-40 rounded-lg shadow-lg border border-cyan-500/50" />
                    
                    <a href={QR_CODE_PATH} download="upi_qr_code.png" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold flex items-center space-x-1">
                        Download QR Code
                    </a>

                    <div className="text-center w-full">
                        <p className="text-lg font-bold text-gray-300 Graduate">Entry Fee:</p>
                        <p className="text-xl font-bold text-lime-400 mt-1">
                            NITN Students: {event?.feeNIT} / Other Students: {event?.feeOutside}
                        </p>
                    </div>
                </div>
                
                {/* Group 1: Team & Affiliation Info */}
                <fieldset className={fieldsetClass}>
                    <legend className={legendClass}>{isTeamEvent ? 'Team Details' : 'Individual Details'}</legend>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        
                        {/* Team Name (Conditional) */}
            
                            <div className="md:col-span-2">
                                <label htmlFor="teamName" className={labelClass}>Team Name</label>
                                <input type="text" id="teamName" name="teamName" required className={inputClass} placeholder="E.g., Cyber Knights" onChange={handleLeaderChange} />
                            </div>
                        
                        
                        {/* Affiliation (Radio Buttons) */}
                        <div className="flex flex-col justify-end">
                            <label className={labelClass}>Affiliation</label>
                            <div className="flex space-x-6 pt-3">
                                <div className="flex items-center">
                                  <input type="radio" id="nitNagaland" name="collegeAffiliation" value="NIT Nagaland" checked={selectedCollegeType === 'NIT Nagaland'} onChange={() => setSelectedCollegeType('NIT Nagaland')} className="form-radio h-4 w-4 text-cyan-500 focus:ring-cyan-500" />
                                  <label htmlFor="nitNagaland" className="ml-2 text-sm text-white">NIT Nagaland Student</label>
                                </div>
                                <div className="flex items-center">
                                  <input type="radio" id="otherCollege" name="collegeAffiliation" value="Other College/University" checked={selectedCollegeType === 'Other College/University'} onChange={() => setSelectedCollegeType('Other College/University')} className="form-radio h-4 w-4 text-cyan-500 focus:ring-cyan-500" />
                                  <label htmlFor="otherCollege" className="ml-2 text-sm text-white">Others</label>
                                </div>
                            </div>
                        </div>
                    </div>

                </fieldset>

                {/* Group 2: Leader's Contact Info */}
                <fieldset className={fieldsetClass}>
                    <legend className={legendClass}>Leader's Contact Details</legend>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="leaderName" className={labelClass}>Full Name</label>
                            <input type="text" id="leaderName" name="leaderName" required className={inputClass} placeholder="E.g., Alex Johnson" onChange={handleLeaderChange} />
                        </div>
                        
                        <div>
                            <label htmlFor="email" className={labelClass}>Email Address</label>
                            <input type="email" id="email" name="email" required className={inputClass} placeholder="E.g., leader@example.com" onChange={handleLeaderChange} />
                        </div>

                        <div>
                            <label htmlFor="phone" className={labelClass}>Phone / WhatsApp Number</label>
                            <input type="tel" id="phone" name="phone" required className={inputClass} placeholder="E.g., +91 98765 43210" onChange={handleLeaderChange} />
                        </div>

                        {/* Conditional Roll Number Input for Leader */}
                        {selectedCollegeType === 'NIT Nagaland' && (
                            <div>
                                <label htmlFor="rollNumber" className={labelClass}>Registration Number (Required)</label>
                                <input type="text" id="rollNumber" name="rollNumber" required className={inputClass} placeholder="E.g., B20CS1001" onChange={handleLeaderChange} />
                            </div>
                        )}
                        {requiresGameId && (
                            <div>
                                <label htmlFor="id" className={labelClass}>InGame Id</label>
                                <input type="text" id="id" name="id" required className={inputClass} placeholder="E.g., 5112616238" onChange={handleLeaderChange} />
                            </div>
                        )}
                    </div>

                    
                </fieldset>


                {/* Group 3: Team Members (Conditional for Team Events) */}
                {isTeamEvent && (
                    <fieldset className={fieldsetClass}>
                        <legend className={legendClass}>Team Members ({teamMembers.length} of {event?.maxMembers})</legend>
                        
                        {teamMembers.map((member, index) => (
                            <div key={index} className="grid md:grid-cols-3 gap-3 items-center">
                                
                                {/* Member Name */}
                                <div className="md:col-span-1">
                                    <input 
                                        type="text" 
                                        value={member.name}
                                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                        className={inputClass}
                                        placeholder={`Member ${index + 1} Name`}
                                        required={index === 0 && isTeamEvent} // Leader is required
                                    />
                                </div>
                                
                                {/* Conditional Roll Number (NITN) */}
                                {selectedCollegeType === 'NIT Nagaland' && (
                                    <div className="md:col-span-1">
                                        <input 
                                            type="text" 
                                            value={member.rollNumber}
                                            onChange={(e) => handleMemberChange(index, 'rollNumber', e.target.value)}
                                            className={inputClass}
                                            placeholder="Registration No."
                                            required={false} // Optional for team members
                                        />
                                    </div>
                                )}

                                {/* Conditional In-Game ID Input (NEW FIELD) */}
                                {requiresGameId && (
                                    <div className="md:col-span-1">
                                        <input 
                                            type="text" 
                                            value={member.inGameID}
                                            onChange={(e) => handleMemberChange(index, 'inGameID', e.target.value)}
                                            className={inputClass}
                                            placeholder="In-Game ID"
                                            required={false} // Optional for team members
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        {teamMembers.length < (event?.maxMembers || 4) && (
                            <button 
                              type="button" 
                              onClick={handleAddMember} 
                              className="mt-2 text-cyan-400 Gluten hover:text-cyan-300 transition-colors duration-300 text-sm flex items-center border border-cyan-500/30 p-2 rounded-lg"
                            >
                              + Add Another Member
                            </button>
                        )}
                    </fieldset>
                )}
                    <div>
                        <label htmlFor="imageUpload" className={labelClass}>Upload Payment Screenshot</label>
                        <input type="file" id="imageUpload" name="imageUpload" accept="image/*" className="w-full p-3 rounded-lg Gluten bg-gray-800/80 border border-gray-700 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30 transition-colors" />
                    </div>
                {/* Submit Button */}
                <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-3 text-lg font-semibold uppercase Graduate tracking-widest rounded-lg transition-all duration-300
                                 bg-red-700/70 border border-red-500 text-white hover:bg-red-600 hover:shadow-2xl hover:shadow-red-500/50 active:scale-95 disabled:bg-gray-600 disabled:border-gray-500"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                    </button>
                </div>
            </form>
            
            {/* Back Button */}
            <div className="mt-8 text-center">
                <Link to={`/events/${eventId}`} className="text-gray-200 Gluten hover:text-white transition-colors duration-300">
                    &larr; Cancel and Go Back to Event Details
                </Link>
            </div>
            
        </div>
        </div>
    );
}