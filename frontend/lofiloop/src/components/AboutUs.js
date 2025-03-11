// pages/about.js
"use client";

import React from 'react';
import styles from './AboutUs.css'; // Create this CSS module file

const About = () => {
    const team = [
        { name: 'Jack', role: 'Project Lead' },
        { name: 'Alysha', role: 'Project Lead' },
        { name: 'Calvin', role: 'Developer' },
        { name: 'Xinyu', role: 'Developer' },
        { name: 'Jessica', role: 'Developer' },
        { name: 'Krupa', role: 'Developer' },
        { name: 'Aumrita', role: 'Developer' },
        { name: 'Eric', role: 'Developer' },
    ];

    return (
        <div className={styles.aboutContainer}>
            <section className={styles.aboutText}>
                <h2>About Us</h2>
                <p>
                Say goodbye to the endless search for the perfect study or work playlist! 
                With this web app, just open a tab and let AI-generated music set the mood. 
                From relaxing lo-fi beats to soothing ambient sounds, it's your go-to for 
                staying focused and productive — no distractions, no interruptions, 
                just the perfect background vibes.
                </p>
            </section>
            <aside className={styles.teamList}>
                <h2>The Team</h2>
                <ul>
                    {team.map((member, index) => (
                        <li key={index} className={styles.teamMember}>
                            {member.name}
                            {member.role === 'Project Lead' && (
                                <span className={styles.projectManager}>Project Lead</span>
                            )}
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
};

export default About;