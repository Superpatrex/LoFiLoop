"use client";

import React from 'react';
import './AboutUs.css'; // Import the CSS

export default function AboutUs() {
    const team = [
        { name: 'Jack Andrews', role: 'Project Lead', github: 'https://github.com/Superpatrex' },
        { name: 'Alysha Irvin', role: 'Project Lead', github: 'https://github.com/alyirvin' },
        { name: 'Calvin Cheah', role: 'Developer', github: 'https://github.com/calvinc903' },
        { name: 'Krupa Patel', role: 'Developer', github: 'https://github.com/krupaapatell' },
        { name: 'Jessica Osborne', role: 'Developer', github: 'https://github.com/0zzy4' },
        { name: 'Xinyu Su', role: 'Developer', github: 'https://github.com/c-mfy' },
        { name: 'Aumrita Maitra', role: 'Developer', github: 'https://github.com/aumritam' },
        { name: 'Eric Son', role: 'Developer', github: 'https://github.com/eson39' },
        { name: 'Anna Zhao', role: 'Developer', github: 'https://github.com/zha0anna'}
    ];

    return (
        <div className="aboutContainer">
            <section className="aboutText">
                <h2>About Us</h2>
                <p>
                Tired of searching for the perfect study or work playlist? 
                Our web app Lofi-Loop generates AI-powered lo-fi music tailored 
                to enhance focus and productivity. With functional signup and login systems, 
                users can create accounts to personalize their experience. Simply open a tab to enjoy 
                music with an audience from around the world, all at the same time. 
                We are powered by a tech stack that includes  <strong> React </strong> 
                and <strong> Next.js </strong> for our frontend and backend, <strong> MongoDB </strong> 
                for managing user accounts and music data, as well as <strong> p5.js </strong> 
                to create dynamic sound waves, enhancing the listening experience. 
                OpenAI components power our live chat feature, as well as the 
                AI-generated music, album names, covers, and even artist names. 
                Enjoy seamless, AI-generated content and join a global community of 
                focused lo-fi listeners!
                </p>
            </section>
            <aside className="teamList">
                <h2>The Team</h2>
                <div className="teamGroup1">
                    <ul>
                        {team.slice(0, 4).map((member, index) => (
                            <li key={index} className="teamMember">
                                {member.github ? (
                                    <a href={member.github} target="_blank" rel="noopener noreferrer">
                                        {member.name}
                                    </a>
                                ) : (
                                    member.name
                                )}
                                {member.role === 'Project Lead' ? (
                                    <span className="projectManager">Project Lead</span>
                                ) : (
                                    <span className="developerRole">Developer</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="teamGroup2">
                    <ul>
                        {team.slice(4).map((member, index) => (
                            <li key={index + 4} className="teamMember">
                                {member.github ? (
                                    <a href={member.github} target="_blank" rel="noopener noreferrer">
                                        {member.name}
                                    </a>
                                ) : (
                                    member.name
                                )}
                                {member.role === 'Project Lead' ? (
                                    <span className="projectManager">Project Lead</span>
                                ) : (
                                    <span className="developerRole">Developer</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </div>
    );
};