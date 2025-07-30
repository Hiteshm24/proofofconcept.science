import React, { useState } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "/components/ui/card"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Users, Lightbulb, Mail, Home, BookOpen, Info, Send, Star, Filter, ChevronRight, Plus } from "lucide-react"

interface Invention {
  id: number
  title: string
  summary: string
  category: string
  date: string
  featured: boolean
}

interface BlogPost {
  id: number
  title: string
  excerpt: string
  author: string
  date: string
  category: string
}

const mockInventions: Invention[] = [
  {
    id: 1,
    title: "Smart Waste Bin",
    summary: "AI-powered waste sorting bin with 90% accuracy in recycling classification",
    category: "Environment",
    date: "2024-01-15",
    featured: true
  },
  {
    id: 2,
    title: "Solar Window Coating",
    summary: "Transparent photovoltaic coating that turns any window into a solar panel",
    category: "Energy",
    date: "2024-01-10",
    featured: true
  },
  {
    id: 3,
    title: "Plant-Based Water Filter",
    summary: "Biodegradable water filtration system using natural plant fibers",
    category: "Health",
    date: "2024-01-08",
    featured: false
  },
  {
    id: 4,
    title: "Modular Urban Garden",
    summary: "Stackable hydroponic system for growing food in small urban spaces",
    category: "Agriculture",
    date: "2024-01-05",
    featured: true
  },
  {
    id: 5,
    title: "Smart Medication Tracker",
    summary: "IoT device that monitors medication adherence and sends alerts",
    category: "Health",
    date: "2024-01-03",
    featured: false
  },
  {
    id: 6,
    title: "Ocean Plastic Recycler",
    summary: "Portable machine that converts ocean plastic into 3D printing filament",
    category: "Environment",
    date: "2024-01-01",
    featured: false
  }
]

const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "From Idea to Prototype: A Step-by-Step Guide",
    excerpt: "Learn the essential steps to transform your invention idea into a working prototype...",
    author: "Dr. Sarah Chen",
    date: "2024-01-12",
    category: "Tutorials"
  },
  {
    id: 2,
    title: "The Future of Sustainable Innovation",
    excerpt: "Exploring how green technology is reshaping the invention landscape...",
    author: "Michael Rodriguez",
    date: "2024-01-09",
    category: "Insights"
  },
  {
    id: 3,
    title: "Funding Your Invention: Crowdfunding vs. Investors",
    excerpt: "A comprehensive comparison of funding options for inventors...",
    author: "Emma Thompson",
    date: "2024-01-06",
    category: "Business"
  }
]

export default function ProofOfConceptScience() {
  const [activeSection, setActiveSection] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    proofOfConcept: '',
    motivation: '',
    monetization: ''
  })
  const [showConfirmation, setShowConfirmation] = useState(false)

  const categories = ['all', 'Environment', 'Energy', 'Health', 'Agriculture', 'Technology']

  const filteredInventions = mockInventions.filter(invention => {
    const matchesSearch = invention.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invention.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || invention.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmation(true)
    setTimeout(() => {
      setShowConfirmation(false)
      setFormData({ title: '', summary: '', proofOfConcept: '', motivation: '', monetization: '' })
    }, 3000)
  }

  const renderHome = () => (
    <div className="space-y-12">
      <section className="text-center py-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to ProofOfConcept.Science</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover groundbreaking inventions and share your innovative ideas with the world
        </p>
        <div className="space-x-4">
          <Button size="lg" onClick={() => setActiveSection('directory')}>
            Explore Inventions
          </Button>
          <Button size="lg" variant="outline" onClick={() => setActiveSection('submit')}>
            Submit Your Idea
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Inventions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {mockInventions.filter(inv => inv.featured).map(invention => (
            <Card key={invention.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{invention.title}</CardTitle>
                <CardDescription>{invention.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{invention.summary}</p>
                <Button variant="ghost" className="p-0" onClick={() => setActiveSection('directory')}>
                  Learn more <ChevronRight className="inline w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">What Our Community Says</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Alex Chen", role: "Inventor", text: "This platform helped me connect with like-minded innovators and refine my prototype." },
            { name: "Maria Garcia", role: "Investor", text: "I've discovered several promising inventions here that I'm now funding." },
            { name: "Dr. James Liu", role: "Researcher", text: "An invaluable resource for staying updated on the latest innovations." }
          ].map((testimonial, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )

  const renderDirectory = () => (
    <div>
      <h1 className="text-3xl font-bold mb-6">Invention Directory</h1>
      
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search inventions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventions.map(invention => (
          <Card key={invention.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{invention.title}</CardTitle>
              <CardDescription className="flex justify-between">
                <span>{invention.category}</span>
                <span>{invention.date}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{invention.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderSubmit = () => (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Submit Your Invention</h1>
      
      {showConfirmation && (
        <Card className="mb-6 bg-green-50">
          <CardContent className="pt-6">
            <p className="text-green-800 font-semibold">Thank you! Your invention has been submitted successfully.</p>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Invention Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="summary">Brief Summary</Label>
          <Textarea
            id="summary"
            value={formData.summary}
            onChange={(e) => setFormData({...formData, summary: e.target.value})}
            required
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="proofOfConcept">Proof of Concept Description</Label>
          <Textarea
            id="proofOfConcept"
            value={formData.proofOfConcept}
            onChange={(e) => setFormData({...formData, proofOfConcept: e.target.value})}
            required
            rows={4}
            placeholder="Describe your prototype, testing results, or validation process..."
          />
        </div>

        <div>
          <Label htmlFor="motivation">Why Did You Create This?</Label>
          <Textarea
            id="motivation"
            value={formData.motivation}
            onChange={(e) => setFormData({...formData, motivation: e.target.value})}
            required
            rows={3}
            placeholder="Share the problem you're solving and your inspiration..."
          />
        </div>

        <div>
          <Label htmlFor="monetization">Monetization Ideas</Label>
          <Textarea
            id="monetization"
            value={formData.monetization}
            onChange={(e) => setFormData({...formData, monetization: e.target.value})}
            rows={3}
            placeholder="How do you envision making this commercially viable?"
          />
        </div>

        <Button type="submit" size="lg" className="w-full">
          <Send className="w-4 h-4 mr-2" />
          Submit Invention
        </Button>
      </form>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Submission Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>Ensure your invention is original and not patented by others</li>
            <li>Provide clear, detailed descriptions of your proof of concept</li>
            <li>Include photos, videos, or documentation when possible</li>
            <li>Be honest about the current stage of development</li>
            <li>Respect intellectual property rights of others</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )

  const renderBlog = () => (
    <div>
      <h1 className="text-3xl font-bold mb-6">Invention Insights</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBlogPosts.map(post => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{post.title}</CardTitle>
              <CardDescription>
                By {post.author} • {post.date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Button variant="ghost" className="p-0">
                Read more <ChevronRight className="inline w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderAbout = () => (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About ProofOfConcept.Science</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            ProofOfConcept.Science was founded to bridge the gap between innovative ideas and real-world impact. 
            We believe that every great invention starts with a simple concept and deserves a platform to shine.
          </p>
          <p className="text-gray-600">
            Our goal is to create a community where inventors can showcase their work, receive feedback, 
            and connect with potential collaborators, investors, and users.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>About the Founder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Dr. Amanda Foster</h3>
              <p className="text-gray-600">
                A serial entrepreneur and innovation researcher with over 15 years of experience in bringing 
                scientific concepts to market. Amanda holds a PhD in Materials Science and has successfully 
                launched three startups based on university research.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connect With Us</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Email:</strong> hello@proofofconcept.science</p>
            <p><strong>Twitter:</strong> @proofofconceptsci</p>
            <p><strong>LinkedIn:</strong> /company/proofofconcept-science</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContact = () => (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
          <CardDescription>
            Have questions, feedback, or want to collaborate? We'd love to hear from you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" required />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={5} required />
            </div>
            <Button type="submit" className="w-full">
              <Mail className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )

  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'directory', label: 'Inventions', icon: Lightbulb },
    { id: 'submit', label: 'Submit', icon: Plus },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold">ProofOfConcept.Science</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              {navigation.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && renderHome()}
        {activeSection === 'directory' && renderDirectory()}
        {activeSection === 'submit' && renderSubmit()}
        {activeSection === 'blog' && renderBlog()}
        {activeSection === 'about' && renderAbout()}
        {activeSection === 'contact' && renderContact()}
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Lightbulb className="w-6 h-6 text-blue-600" />
              <span className="font-semibold">ProofOfConcept.Science</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2024 ProofOfConcept.Science. Empowering innovation, one concept at a time.
            </p>
          </div>
        </div>
      </footer>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around py-2">
          {navigation.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center p-2 ${
                activeSection === item.id ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
