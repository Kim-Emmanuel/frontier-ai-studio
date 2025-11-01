"use client";

import React from 'react';
import AboutHero from '../../components/about/AboutHero';
import Timeline from '../../components/about/Timeline';
import ValuesGrid from '../../components/about/ValuesGrid';
import ExperienceGrid from '../../components/about/ExperienceGrid';
import Education from '../../components/about/Education';
import BeyondCode from '../../components/about/BeyondCode';
import Quote from '../../components/about/Quote';
import ScrollAnimations from '../../components/ScrollAnimations';
import { Container } from '../../components/ui';

const AboutPage: React.FC = () => {
	return (
		<main className="min-h-screen">
			<ScrollAnimations />

					<section className="w-full bg-transparent py-16">
						
							<AboutHero />
						
					</section>

					<section className="w-full py-12 bg-secondary/5">
						<Container>
							<Quote quote="Simplicity is the soul of efficiency." author="— My guiding principle" />
						</Container>
					</section>

					<section className="w-full py-16">
						<Container>
							<h2 className="text-3xl font-bold mb-6 reveal">Story Timeline</h2>
							<Timeline />
						</Container>
					</section>

					<section className="w-full py-16 bg-secondary/5">
						<Container>
							<h2 className="text-3xl font-bold mb-6 reveal">Values & Philosophy</h2>
							<ValuesGrid />
						</Container>
					</section>

					<section className="w-full py-16">
						<Container>
							<h2 className="text-3xl font-bold mb-6 reveal">Work Experience</h2>
							<ExperienceGrid />
						</Container>
					</section>

					<section className="w-full py-16 bg-secondary/5">
						<Container>
							<h2 className="text-3xl font-bold mb-6 reveal">Education</h2>
							<Education />
						</Container>
					</section>

					<section className="w-full py-16">
						<Container>
							<h2 className="text-3xl font-bold mb-6 reveal">Beyond Code</h2>
							<BeyondCode />
						</Container>
					</section>
		</main>
	);
};

export default AboutPage;
