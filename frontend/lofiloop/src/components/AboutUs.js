"use client";

import React from 'react';
import './AboutUs.css'; // Import the CSS

export default function AboutUs() {
    const team = [
        { name: 'Jack Andrews', role: 'Project Lead' },
        { name: 'Alysha Irvin', role: 'Project Lead' },
        { name: 'Calvin Cheah', role: 'Developer' },
        { name: 'Krupa Patel', role: 'Developer' },
        { name: 'Jessica Osborne', role: 'Developer' },
        { name: 'Xinyu Su', role: 'Developer' },
        { name: 'Aumrita Maitra', role: 'Developer' },
        { name: 'Eric Son', role: 'Developer' },
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
                <ul>
                    {team.map((member, index) => (
                        <li key={index} className="teamMember">
                            {member.name}
                            {member.role === 'Project Lead' ? (
                                <span className="projectManager">Project Lead</span>
                            ) : (
                                <span className="developerRole">Developer</span>
                            )}
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
};