import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="container mx-auto px-4 md:px-8 py-16 space-y-16">
            {/* Intro */}
            <section className="text-center max-w-3xl mx-auto space-y-6">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-dark"
                >
                    About SAAD FurniStore
                </motion.h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    We believe that furniture is more than just functional objects; it's about creating spaces that reflect your personality and allow you to live comfortably.
                </p>
            </section>

            {/* Story */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="rounded-2xl overflow-hidden aspect-video relative">
                    <img
                        src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=2070"
                        alt="Our Studio"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-dark">Our Story</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Founded in 2018, SAAD FurniStore started with a simple mission: to make premium, modern furniture accessible to everyone. We started as a small team of designers and craftsmen, united by our passion for minimalism and functionality.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Today, we curate pieces that blend timeless design with modern comfort, ensuring that every piece you buy from us stands the test of time both in style and durability.
                    </p>
                </div>
            </section>

            {/*  Values */}
            <section className="bg-neutral rounded-3xl p-8 md:p-16">
                <h2 className="text-3xl font-bold text-dark mb-12 text-center">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Quality First", text: "We never compromise on materials or craftsmanship. Every stitch details counts." },
                        { title: "Sustainable Design", text: "We prioritize eco-friendly materials and sustainable production processes." },
                        { title: "Customer Obsession", text: "Your comfort is our priority. We are here to support you at every step." }
                    ].map((val, i) => (
                        <div key={i} className="bg-white p-8 rounded-xl shadow-sm">
                            <h3 className="text-xl font-bold text-primary mb-4">{val.title}</h3>
                            <p className="text-gray-600">{val.text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
