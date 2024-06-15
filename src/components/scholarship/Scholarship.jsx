import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Scholarship = () => {
    const [scholarships, setScholarships] = useState([]);
    const [enlargedCard, setEnlargedCard] = useState(null);

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const response = await axios.get('http://localhost:5000/scholarships');
                console.log('Fetched scholarships data:', response.data);
                setScholarships(response.data);
            } catch (error) {
                console.error('Error fetching scholarships data:', error);
            }
        };

        fetchScholarships();
    }, []);

    const enlargeCard = (id) => {
        console.log("Clicked card id:", id); // Logging clicked card id
        setEnlargedCard(id);
    };

    const minimizeCard = () => {
        setEnlargedCard(null);
    };

    const changeCard = (direction) => {
        if (enlargedCard !== null) {
            const currentIndex = scholarships.findIndex(scholarship => scholarship.id === enlargedCard);
            const newIndex = (currentIndex + direction + scholarships.length) % scholarships.length;
            console.log(`${direction > 0 ? 'Next' : 'Previous'} card id:`, scholarships[newIndex].id);
            setEnlargedCard(scholarships[newIndex].id);
        }
    };

    const nextCard = () => changeCard(1);
    const prevCard = () => changeCard(-1);

    return (
        <div className="bg-gray-900 min-h-screen py-8 rounded-lg">
            <div className="max-w-screen-lg mx-auto px-4 relative z-10">
                {scholarships.map((scholarship) => (
                    <div key={scholarship.id} className="relative">
                        {enlargedCard === scholarship.id && (
                            <div className="fixed inset-0 flex items-center justify-center z-40">
                                <div className="bg-gray-700 text-gray-100 rounded-lg shadow-lg p-6 flex items-start space-x-6 relative">
                                    <img
                                        src={scholarship.image}
                                        alt={scholarship.title}
                                        className="w-80 h-80 rounded-full object-cover"
                                    />
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-semibold text-blue-400 mb-1">{scholarship.title}</h3>
                                        <p className="text-gray-300 mb-1">{scholarship.location}</p>
                                        <p className="text-gray-300 mb-1">{scholarship.date}</p>
                                        <p className="text-gray-300 mb-1">{scholarship.amount}</p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <span className="text-yellow-400">{"⭐".repeat(scholarship.rating)}</span>
                                            <span className="text-gray-300">{scholarship.reviews} reviews</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={prevCard} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-300 text-xl focus:outline-none z-50">
                                    &#10094;
                                </button>
                                <button onClick={nextCard} className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-300 text-xl focus:outline-none z-50">
                                    &#10095;
                                </button>
                            </div>
                        )}
                        <div className={`${enlargedCard !== scholarship.id ? 'cursor-pointer' : ''}`} onClick={() => enlargeCard(scholarship.id)}>
                            <div className={`${enlargedCard !== scholarship.id ? 'bg-gray-700 text-gray-100 rounded-lg shadow-lg p-6 mb-6 flex items-start space-x-6' : 'hidden'}`}>
                                <img src={scholarship.image} alt={scholarship.title} className="w-20 h-20 rounded-full object-cover" />
                                <div className="flex-grow">
                                    <h3 className="text-xl font-semibold text-blue-400 mb-1">{scholarship.title}</h3>
                                    <p className="text-gray-300 mb-1">{scholarship.location}</p>
                                    <p className="text-gray-300 mb-1">{scholarship.date}</p>
                                    <p className="text-gray-300 mb-1">{scholarship.amount}</p>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <span className="text-yellow-400">{"⭐".repeat(scholarship.rating)}</span>
                                        <span className="text-gray-300">{scholarship.reviews} reviews</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {enlargedCard && (
                    <button onClick={minimizeCard} className="absolute top-4 right-4 text-gray-300 text-xl focus:outline-none z-50">
                        &times;
                    </button>
                )}
            </div>
        </div>
    );
};

export default Scholarship;
