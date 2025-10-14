import React, { useState } from 'react';
import { Upload, X, Plus, Link as LinkIcon } from 'lucide-react';

export default function SubmitPage() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null,
        category_id: '',
        tags: [],
        members: [],
        links: '',
        status: 'active',
        featured: 'false'
    });
    
    const [newTag, setNewTag] = useState('');
    const [newMember, setNewMember] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));
        }
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            const file = files[0];
            // Check if it's an image
            if (file.type.startsWith('image/')) {
                setFormData(prev => ({
                    ...prev,
                    image: file
                }));
            }
        }
    };

    const addTag = () => {
        if (newTag.trim() && formData.tags.length < 10) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const removeTag = (index) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter((_, i) => i !== index)
        }));
    };

    const addMember = () => {
        if (newMember.trim()) {
            setFormData(prev => ({
                ...prev,
                members: [...prev.members, newMember.trim()]
            }));
            setNewMember('');
        }
    };

    const removeMember = (index) => {
        setFormData(prev => ({
            ...prev,
            members: prev.members.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const submitData = new FormData();
            submitData.append('name', formData.name);
            submitData.append('description', formData.description);
            submitData.append('category_id', formData.category_id);
            submitData.append('tags', JSON.stringify(formData.tags));
            submitData.append('members', JSON.stringify(formData.members));
            submitData.append('links', formData.links);
            submitData.append('status', formData.status);
            submitData.append('featured', formData.featured);
            
            if (formData.image) {
                submitData.append('image', formData.image);
            }

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'}/projects`, {
                method: 'POST',
                body: submitData
            });

            const result = await response.json();

            if (result.success) {
                setSubmitMessage('Project successfully submitted for review! Check back in a couple days to see it featured.');
                setFormData({
                    name: '',
                    description: '',
                    image: null,
                    category_id: '',
                    tags: [],
                    members: [],
                    links: '',
                    status: 'active',
                    featured: 'false'
                });
            } else {
                setSubmitMessage(result.message || 'Error submitting project. Please try again.');
            }
            
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitMessage('Error submitting project. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Submit Your <span className="text-blue-400">Project</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Share your amazing project with the Purdue community! 
                        Fill out the form below to submit your project for review.
                    </p>
                </div>

                <div className="bg-black/40 rounded-lg p-8 border border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-white text-lg font-medium mb-3">
                                Project Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your project name"
                            />
                        </div>

                        <div>
                            <label className="block text-white text-lg font-medium mb-3">
                                Project Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                rows={6}
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                                placeholder="Describe your project, what it does, technologies used, and what makes it special..."
                            />
                        </div>

                        <div>
                            <label className="block text-white text-lg font-medium mb-3">
                                Project Image *
                            </label>
                            <div 
                                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                                    isDragging 
                                        ? 'border-blue-500 bg-blue-500/10' 
                                        : 'border-gray-600 hover:border-blue-500'
                                }`}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image-upload"
                                    required
                                />
                                <label htmlFor="image-upload" className="cursor-pointer">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-300 mb-2">
                                        {formData.image ? formData.image.name : 'Click to upload or drag and drop project image'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-white text-lg font-medium mb-3">
                                Project Category *
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { value: 'personal-project', label: 'Personal Project' },
                                    { value: 'class-project', label: 'Class Project' },
                                    { value: 'hackathon', label: 'Hackathon Project' }
                                ].map((option) => (
                                    <label key={option.value} className="flex items-center p-4 bg-gray-800 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                                        <input
                                            type="radio"
                                            name="category_id"
                                            value={option.value}
                                            checked={formData.category_id === option.value}
                                            onChange={handleInputChange}
                                            className="mr-3 appearance-none w-4 h-4 border-2 border-gray-400 rounded-sm checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
                                            required
                                        />
                                        <span className="text-white">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-white text-lg font-medium mb-3">
                                Tags (Max 10) *
                            </label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {formData.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-3 py-1 bg-blue-600/20 text-blue-300 text-sm rounded-md"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(index)}
                                            className="ml-2 text-blue-400 hover:text-blue-200"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                    placeholder="Add a tag..."
                                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    disabled={formData.tags.length >= 10}
                                />
                                <button
                                    type="button"
                                    onClick={addTag}
                                    disabled={!newTag.trim() || formData.tags.length >= 10}
                                    className={`px-4 py-2 bg-black/60 backdrop-blur-sm rounded-xl transition-all duration-300 flex items-center ${
                                        newTag.trim() && formData.tags.length < 10
                                            ? 'border-2 border-blue-500 text-blue-300 hover:bg-black/80 hover:border-blue-400 hover:text-blue-200 hover:shadow-lg hover:shadow-blue-500/20'
                                            : 'border border-blue-500/30 text-blue-300/50 opacity-50 cursor-not-allowed'
                                    }`}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">
                                {formData.tags.length}/10 tags
                            </p>
                        </div>

                        <div>
                            <label className="block text-white text-lg font-medium mb-3">
                                Team Members *
                            </label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {formData.members.map((member, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-3 py-1 bg-blue-600/20 text-blue-300 text-sm rounded-md"
                                    >
                                        {member}
                                        <button
                                            type="button"
                                            onClick={() => removeMember(index)}
                                            className="ml-2 text-blue-400 hover:text-blue-200"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newMember}
                                    onChange={(e) => setNewMember(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMember())}
                                    placeholder="Add team member name..."
                                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={addMember}
                                    disabled={!newMember.trim()}
                                    className={`px-4 py-2 bg-black/60 backdrop-blur-sm rounded-xl transition-all duration-300 flex items-center ${
                                        newMember.trim()
                                            ? 'border-2 border-blue-500 text-blue-300 hover:bg-black/80 hover:border-blue-400 hover:text-blue-200 hover:shadow-lg hover:shadow-blue-500/20'
                                            : 'border border-blue-500/30 text-blue-300/50 opacity-50 cursor-not-allowed'
                                    }`}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">
                                {formData.members.length} members
                            </p>
                        </div>

                        <div>
                            <label className="block text-white text-lg font-medium mb-3">
                                Project Link *
                            </label>
                            <div className="relative">
                                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="url"
                                    name="links"
                                    value={formData.links}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="https://your-project-link.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-white text-lg font-medium mb-3">
                                Project Status *
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { value: 'active', label: 'Ongoing' },
                                    { value: 'completed', label: 'Completed' }
                                ].map((option) => (
                                    <label key={option.value} className="flex items-center p-4 bg-gray-800 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                                        <input
                                            type="radio"
                                            name="status"
                                            value={option.value}
                                            checked={formData.status === option.value}
                                            onChange={handleInputChange}
                                            className="mr-3 appearance-none w-4 h-4 border-2 border-gray-400 rounded-sm checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
                                            required
                                        />
                                        <span className="text-white">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-8 py-4 bg-black/60 hover:bg-black/80 border border-blue-500/30 hover:border-blue-400/60 text-blue-300 hover:text-blue-200 text-lg font-medium rounded-xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black/60 disabled:hover:border-blue-500/30 disabled:hover:text-blue-300 disabled:hover:shadow-none"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Project'}
                            </button>
                        </div>

                        {submitMessage && (
                            <div className={`p-4 rounded-lg ${
                                submitMessage.includes('Error') 
                                    ? 'bg-red-600/20 text-red-300 border border-red-600/30' 
                                    : 'bg-green-600/20 text-green-300 border border-green-600/30'
                            }`}>
                                {submitMessage}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}