// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  AcademicCapIcon,
  MapPinIcon,
  ClockIcon,
  ChartBarIcon,
  PlayIcon,
  BookmarkIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  UserIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [savedColleges, setSavedColleges] = useState([]);

  // Mock data
  const colleges = [
    {
      id: 1,
      name: "Government Engineering College",
      district: "Mumbai",
      courses: ["B.Tech Computer Science", "B.Tech Mechanical"],
      cutoff: "85%",
      facilities: ["Hostel", "Library", "Lab"],
      medium: "English",
      contact: "+91-98765-43210",
      distanceKm: 2.5,
      lat: 19.0760,
      lon: 72.8777
    },
    {
      id: 2,
      name: "State Medical College",
      district: "Pune",
      courses: ["MBBS", "BDS"],
      cutoff: "92%",
      facilities: ["Hospital", "Hostel", "Research Lab"],
      medium: "English",
      contact: "+91-98765-43211",
      distanceKm: 15.2,
      lat: 18.5204,
      lon: 73.8567
    }
  ];

  const quizQuestions = [
    {
      question: "What subjects interest you the most?",
      options: ["Math & Science", "Commerce & Business", "Arts & Literature", "Social Sciences"]
    },
    {
      question: "What type of career appeals to you?",
      options: ["Technical & Engineering", "Healthcare & Medicine", "Creative & Design", "Teaching & Research"]
    },
    {
      question: "How do you prefer to work?",
      options: ["Problem-solving", "Working with people", "Creative expression", "Analysis & research"]
    }
  ];

  useEffect(() => {
    // Apply dark mode class
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleQuizAnswer = (answerIndex) => {
    const newAnswers = [...quizAnswers, answerIndex];
    setQuizAnswers(newAnswers);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate result based on answers
      const result = calculateQuizResult(newAnswers);
      setQuizStep('result');
    }
  };

  const calculateQuizResult = (answers) => {
    // Simple logic to determine stream based on answers
    const scienceScore = answers.filter(a => a === 0).length;
    const commerceScore = answers.filter(a => a === 1).length;
    const artsScore = answers.filter(a => a === 2 || a === 3).length;

    if (scienceScore >= 2) return { stream: "Science", courses: ["Engineering", "Medicine"] };
    if (commerceScore >= 2) return { stream: "Commerce", courses: ["CA", "MBA"] };
    return { stream: "Arts", courses: ["Literature", "Psychology"] };
  };

  const saveCollege = (college) => {
    if (!savedColleges.find(c => c.id === college.id)) {
      setSavedColleges([...savedColleges, college]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
      {/* Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <AcademicCapIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-slate-800 dark:text-white">PathFinder</h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Career Guidance Platform</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
                  Home
                </a>
                <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
                  Features
                </a>
                <a href="#directory" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
                  Colleges
                </a>
                <a href="#quiz" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
                  Quiz
                </a>
                <a href="#timeline" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
                  Timeline
                </a>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Dark mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <SunIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>

              {/* Profile button */}
              <button
                onClick={() => setProfileOpen(true)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Open profile"
              >
                <UserIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>

              {/* Sign In Button - Integration point for JWT auth */}
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
                {/* TODO: Replace with actual auth flow */}
                Sign In
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Open mobile menu"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#home" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">Home</a>
                <a href="#features" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">Features</a>
                <a href="#directory" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">Colleges</a>
                <a href="#quiz" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">Quiz</a>
                <a href="#timeline" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">Timeline</a>
                <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold">
                  Sign In
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main id="main-content">
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <p className="text-blue-100 text-lg mb-4 font-medium">
                  PathFinder — Find the right degree, college & career path after Class 12.
                </p>

                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                  Choose the right{' '}
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                    stream
                  </span>
                  . Enrol in the right{' '}
                  <span className="bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
                    college
                  </span>
                  . Build your future.
                </h1>

                <p className="text-xl text-blue-100 mb-8 max-w-2xl">
                  Personalized aptitude quizzes, local government college listings, and clear course→career maps — all in one place.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                  >
                    <PlayIcon className="h-5 w-5 mr-2" />
                    Take the Quiz
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/30 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 flex items-center justify-center"
                  >
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    Find Colleges Near Me
                  </motion.button>
                </div>

                {/* Micro Stats */}
                <div className="flex flex-wrap gap-6">
                  {[
                    { number: "200+", label: "colleges", color: "from-blue-400 to-blue-600" },
                    { number: "Free", label: "guidance", color: "from-green-400 to-green-600" },
                    { number: "Pilot", label: "districts", color: "from-purple-400 to-purple-600" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                      className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
                    >
                      <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                        {stat.number}
                      </div>
                      <div className="text-blue-100 font-medium text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Illustration */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  {/* Placeholder illustration */}
                  <div className="w-full h-96 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <AcademicCapIcon className="h-24 w-24 text-white/70 mx-auto mb-4" />
                      <p className="text-white/70 font-medium">Hero Illustration Placeholder</p>
                      <p className="text-white/50 text-sm mt-2">Replace with actual SVG illustration</p>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-2xl">🎯</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
                What PathFinder offers
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                A one-stop personalized guidance platform for students to choose subjects, discover colleges, and plan the path ahead.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Aptitude Quiz",
                  description: "Short quizzes to recommend streams & courses",
                  icon: ChartBarIcon,
                  gradient: "from-blue-500 to-purple-500"
                },
                {
                  title: "Course → Career Mapping",
                  description: "Visual path from degree to jobs & higher study",
                  icon: MapPinIcon,
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  title: "Nearby Government Colleges",
                  description: "Location-based list with facilities & cutoffs",
                  icon: AcademicCapIcon,
                  gradient: "from-green-500 to-blue-500"
                },
                {
                  title: "Timeline Tracker",
                  description: "Admission dates, scholarship windows & reminders",
                  icon: ClockIcon,
                  gradient: "from-orange-500 to-red-500"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Directory Section */}
        <section id="directory" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
                Find Government Colleges Near You
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Discover the best government colleges in your area with detailed information about courses, cutoffs, and facilities.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Search and Results */}
              <div className="space-y-6">
                {/* Search and Filters */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                      <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search colleges..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <select
                      value={selectedStream}
                      onChange={(e) => setSelectedStream(e.target.value)}
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    >
                      <option value="">All Streams</option>
                      <option value="engineering">Engineering</option>
                      <option value="medical">Medical</option>
                      <option value="commerce">Commerce</option>
                      <option value="arts">Arts</option>
                    </select>
                  </div>

                  {/* Facility Filters */}
                  <div className="flex flex-wrap gap-3">
                    {["Hostel", "Library", "Lab", "Hospital", "Sports"].map((facility) => (
                      <button
                        key={facility}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg text-sm font-medium transition-colors"
                      >
                        {facility}
                      </button>
                    ))}
                  </div>
                </div>

                {/* College Results */}
                <div className="space-y-4">
                  {colleges.map((college) => (
                    <motion.div
                      key={college.id}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      onClick={() => setSelectedCollege(college)}
                      className={`bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 ${selectedCollege?.id === college.id
                          ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                          : 'border-gray-200 dark:border-gray-700'
                        }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
                            {college.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {college.district} • {college.distanceKm} km away
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${college.distanceKm < 6
                            ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                          {college.distanceKm < 6 ? 'Recommended' : 'Available'}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Courses Available:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {college.courses.map((course, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-lg text-sm"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Cutoff: <span className="font-semibold text-slate-800 dark:text-white">{college.cutoff}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              saveCollege(college);
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 bg-orange-100 dark:bg-orange-800 hover:bg-orange-200 dark:hover:bg-orange-700 text-orange-700 dark:text-orange-300 rounded-lg text-sm font-medium transition-colors"
                          >
                            <BookmarkIcon className="h-4 w-4" />
                            Save
                          </button>
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium transition-colors">
                            <EyeIcon className="h-4 w-4" />
                            View
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: Map Placeholder */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                <div className="w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPinIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Interactive Map</p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                      Replace with react-leaflet component
                    </p>
                    {/* TODO: Integrate react-leaflet map with markers */}
                    {/* TODO: Connect to /api/colleges endpoint for real data */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Preview Section */}
        <section id="quiz" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
                Career Aptitude Quiz
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Discover your ideal career path with our scientifically-designed aptitude assessment.
              </p>
            </motion.div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-purple-900 rounded-2xl p-8 shadow-xl">
              {quizStep === 'result' ? (
                /* Quiz Result */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ChartBarIcon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                    Your Recommended Stream: {calculateQuizResult(quizAnswers).stream}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Based on your responses, here are your top career paths:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {calculateQuizResult(quizAnswers).courses.map((course, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                        <h4 className="font-bold text-slate-800 dark:text-white">{course}</h4>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-800 dark:text-white">Next Steps:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                        Apply Now
                      </button>
                      <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                        Read Materials
                      </button>
                      <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                        Find Scholarships
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setQuizStep(0);
                      setQuizAnswers([]);
                    }}
                    className="mt-6 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Take Quiz Again
                  </button>
                </motion.div>
              ) : (
                /* Quiz Questions */
                <div>
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>Question {quizStep + 1} of {quizQuestions.length}</span>
                      <span>{Math.round(((quizStep + 1) / quizQuestions.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <motion.div
                    key={quizStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center">
                      {quizQuestions[quizStep].question}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {quizQuestions[quizStep].options.map((option, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleQuizAnswer(index)}
                          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-left border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-600"
                        >
                          <p className="font-semibold text-slate-800 dark:text-white">{option}</p>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
            {/* TODO: Replace with server-side AI integration using Google Gemini API */}
            {/* TODO: Connect to /api/quiz endpoint for enhanced assessment */}
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
                Important Dates & Timeline
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Stay on track with admission deadlines and scholarship opportunities.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>

              <div className="space-y-12">
                {[
                  {
                    date: "March 2025",
                    title: "Board Exam Results",
                    description: "Class 12 results announcement for most state boards",
                    type: "important"
                  },
                  {
                    date: "April 2025",
                    title: "College Applications Open",
                    description: "Start of admission process for government colleges",
                    type: "deadline"
                  },
                  {
                    date: "May 2025",
                    title: "Entrance Exams",
                    description: "JEE, NEET, and other competitive exams",
                    type: "exam"
                  },
                  {
                    date: "June 2025",
                    title: "Counselling Process",
                    description: "Choice filling and seat allocation begins",
                    type: "process"
                  },
                  {
                    date: "July 2025",
                    title: "Classes Begin",
                    description: "Academic year starts for most colleges",
                    type: "milestone"
                  }
                ].map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}
                  >
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg relative z-10">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {event.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                            {event.date}
                          </span>
                          <button
                            className="text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900 p-2 rounded-lg transition-colors"
                            aria-label="Add reminder"
                            onClick={() => {
                              // TODO: Store in localStorage
                              console.log(`Reminder set for ${event.title}`);
                            }}
                          >
                            <ClockIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-800 dark:bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                    <AcademicCapIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">PathFinder</h3>
                    <p className="text-sm text-gray-400">Career Guidance Platform</p>
                  </div>
                </div>
                <p className="text-gray-400 max-w-md">
                  Empowering students to make informed decisions about their academic and career journey through personalized guidance and comprehensive resources.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <a href="#features" className="block text-gray-400 hover:text-white transition-colors">Features</a>
                  <a href="#directory" className="block text-gray-400 hover:text-white transition-colors">College Directory</a>
                  <a href="#quiz" className="block text-gray-400 hover:text-white transition-colors">Aptitude Quiz</a>
                  <a href="#timeline" className="block text-gray-400 hover:text-white transition-colors">Timeline</a>
                </div>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact Us</a>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-8 text-center">
              <p className="text-gray-400">
                © 2025 PathFinder. Built for student success. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Profile Slide-over */}
      <AnimatePresence>
        {profileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setProfileOpen(false)}
            />

            {/* Profile Panel */}
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">Profile</h3>
                  <button
                    onClick={() => setProfileOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {/* Mock User Info */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">JS</span>
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white">John Student</h4>
                  <p className="text-gray-600 dark:text-gray-400">Class 12 - Science</p>
                </div>

                {/* Recommended Streams */}
                <div className="mb-6">
                  <h5 className="font-semibold text-slate-800 dark:text-white mb-3">Recommended Streams</h5>
                  <div className="space-y-2">
                    <div className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-3 py-2 rounded-lg">
                      Engineering (95% match)
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg">
                      Medicine (87% match)
                    </div>
                  </div>
                </div>

                {/* Saved Colleges */}
                <div>
                  <h5 className="font-semibold text-slate-800 dark:text-white mb-3">
                    Saved Colleges ({savedColleges.length})
                  </h5>
                  <div className="space-y-3">
                    {savedColleges.map((college) => (
                      <div key={college.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <h6 className="font-medium text-slate-800 dark:text-white text-sm">
                          {college.name}
                        </h6>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">
                          {college.district} • {college.distanceKm} km
                        </p>
                      </div>
                    ))}
                    {savedColleges.length === 0 && (
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        No saved colleges yet. Browse the directory to save colleges you're interested in.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}