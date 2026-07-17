import envs from "../config/index.js";
import mongoose from "mongoose";
import { EventModel } from "../models/event.js";

const CREATED_BY = "6a3e86ffb8e9d68417fb2255";

const techTitles = [
  "Hack the Future",
  "CodeSprint 2026",
  "AI Fundamentals Workshop",
  "Web Development Bootcamp",
  "Cyber Security Challenge",
  "Competitive Programming Contest",
  "Cloud Computing Essentials",
  "Open Source Contribution Day",
  "Build with React",
  "Node.js Crash Course",
  "Machine Learning Meetup",
  "DevOps Hands-on Lab",
  "Blockchain Basics",
  "Git & GitHub Workshop",
  "Data Structures Masterclass",
  "Mobile App Development",
  "Startup Pitch Night",
  "Tech Quiz",
  "IoT Innovation Expo",
  "Design Thinking Workshop",
  "Game Development Jam",
  "Robotics Showcase",
  "Capture The Flag",
  "Linux Install Fest",
  "API Design Workshop",
  "Docker Deep Dive",
  "UI/UX Design Sprint",
  "Database Optimization Session",
  "Python for Beginners",
  "Build Your First SaaS",
];

const artTitles = [
  "Open Mic Night",
  "Photography Walk",
  "Sketch & Chill",
  "Digital Art Workshop",
  "Canvas Painting Competition",
  "Street Photography Contest",
  "Short Film Festival",
  "Poetry Slam",
  "Creative Writing Workshop",
  "Music Jam Session",
  "Battle of Bands",
  "Dance Showcase",
  "Theatre Auditions",
  "Stand-up Comedy Night",
  "Fashion Illustration Workshop",
  "Clay Modeling Session",
  "Calligraphy Workshop",
  "Origami Challenge",
  "Anime Art Contest",
  "Portrait Drawing Competition",
  "Film Appreciation Club",
  "Watercolor Basics",
  "Mural Painting Drive",
  "Photography Exhibition",
  "Music Production Basics",
  "Graphic Design Challenge",
  "Logo Design Contest",
  "Creative Poster Competition",
  "Storytelling Evening",
  "Cultural Fest Performances",
];

const recreationalTitles = [
  "Football Tournament",
  "Cricket League",
  "Basketball Championship",
  "Badminton Open",
  "Table Tennis Tournament",
  "Chess Championship",
  "BGMI Tournament",
  "Free Fire Clash",
  "Valorant Showdown",
  "FIFA Gaming Cup",
  "Treasure Hunt",
  "Escape Room Challenge",
  "Board Game Night",
  "Campus Marathon",
  "Cycling Rally",
  "Yoga Morning",
  "Fitness Challenge",
  "Fun Quiz Night",
  "Trivia Championship",
  "Cooking Competition",
  "Campus Carnival",
  "Movie Night",
  "Karaoke Evening",
  "Talent Hunt",
  "Adventure Camp",
  "Nature Walk",
  "Picnic Day",
  "Carrom Championship",
  "Volleyball Tournament",
  "Frisbee Challenge",
];

const techLocations = [
  "Computer Lab 1",
  "Computer Lab 2",
  "Innovation Lab",
  "AI & ML Lab",
  "Robotics Lab",
  "Seminar Hall A",
  "Conference Room",
  "Innovation Hub",
];

const artLocations = [
  "Main Auditorium",
  "Open Air Theatre",
  "Student Activity Center",
  "Amphitheatre",
  "Main Lawn",
  "Convention Center",
];

const recreationalLocations = [
  "Football Ground",
  "Basketball Court",
  "Cricket Ground",
  "Badminton Court",
  "Indoor Stadium",
  "Gymnasium",
  "Volleyball Court",
];

const images = [
  "https://images.unsplash.com/photo-1511578314322-379afb476865",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
  "https://images.unsplash.com/photo-1515169067868-5387ec356754",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDateWithin60Days() {
  const now = Date.now();
  const sixtyDays = 60 * 24 * 60 * 60 * 1000;

  return new Date(now + Math.random() * sixtyDays);
}

function createEvent() {
  const category = randomItem(["tech", "art", "recreational"] as const);

  let title: string;
  let location: string;

  switch (category) {
    case "tech":
      title = randomItem(techTitles);
      location = randomItem(techLocations);
      break;

    case "art":
      title = randomItem(artTitles);
      location = randomItem(artLocations);
      break;

    default:
      title = randomItem(recreationalTitles);
      location = randomItem(recreationalLocations);
  }

  const startDate = randomDateWithin60Days();

  const deadDate = new Date(startDate);
  deadDate.setDate(deadDate.getDate() - Math.floor(Math.random() * 5 + 1));

  const maxParticipants = randomItem([25, 40, 50, 75, 100, 150]);

  const registrationCount = Math.floor(
    Math.random() * (maxParticipants + 1)
  );

  return {
    title,
    description: `${title} brings together students from across the campus for an engaging experience filled with learning, collaboration, and fun. Whether you're looking to improve your skills, meet new people, or simply enjoy the event, everyone is welcome. Register early as seats are limited.`,

    category,
    location,
    startDate,
    deadDate,

    imageUrl: randomItem(images),

    maxParticipants,
    registrationCount,

    archived: false,

    createdBy: new mongoose.Types.ObjectId(CREATED_BY),
  };
}

async function seed() {
  try {
    await mongoose.connect(envs.mongo_uri);

    await EventModel.deleteMany({});

    const events = Array.from({ length: 500 }, createEvent);

    await EventModel.insertMany(events);

    console.log(`Inserted ${events.length} events`);

    console.log("Done");

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
