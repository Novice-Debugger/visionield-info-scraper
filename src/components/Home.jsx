import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapPin, Building, User, Phone, Mail, Calendar, CheckSquare, Home, Briefcase, Users } from 'lucide-react';

// Sample data from the project
const projectData = {
    "Project Details": {
        "Registration Number": "PR/GJ/VADODARA/VADODARA/Others/RAA00093/EX2/030120",
        "Project Name": "33LE",
        "Project Type": "Residential/Group Housing",
        "Approved Date": "07-09-2017",
        "Project Land Area": "5,463",
        "Project Start Date": "01-04-2014",
        "Project End Date": "30-12-2020",
        "Project Status": "Ongoing",
        "Total Covered Area (Sq Mtrs)": "13,295",
        "Project Address": "BLOCK NO 1778, MOJE BHAYLI, NEAR NAVRACHNA UNIVERSITY, Vadodara, Gujarat, 390007",
        "About Property": "3 TOWERS OF 11 FLOORS, CONNECTED AT TOP LEVEL WITH SWIMMING POOL ON TOP. ONE FLOOR ONE APARTMENT",
        "Plan Passing Authority": "Vadodara Urban Development Authority",
        "Average Carpet Area of Units (Sq Mtrs)": "362.73",
        "Total Units": "33",
        "Available Units": "22",
        "Total No. of Towers/Blocks": "3",
        "Website": "www.kabelbuildcon.com"
    },
    "Promoter Details": {
        "Promoter Name": "KABEL BUILDCON SOLUTIONS PRIVATE LIMITED",
        "Promoter Type": "COMPANY",
        "Contact": "8153035333",
        "Email Id": "info@kabelbuildcon.com",
        "Address": "305 - A , WINDSOR PLAZA, RC dUTT ROAD ALKAPURI, VADODARA GUJARAT Vadodara Vadodara 390007"
    },
    "Directors Details": [
        {
            "Name": "HEMANT MAHENDRAKUMAR KABRA",
            "Email Id": "hemant.kabra@rrglobal.com",
            "Mobile": "8153015333"
        },
        {
            "Name": "RAJESH SHREEGOPAL KABRA",
            "Email Id": "rajesh.kabra@rrglobal.com",
            "Mobile": "8153015333"
        },
        {
            "Name": "MAHHESH KABRA",
            "Email Id": "mahesh.kabra@rrglobal.com",
            "Mobile": "9327251000"
        }
    ],
    "Signatory Details": [
        {
            "Name": "MAHHESH KABRA",
            "Email Id": "mahesh.kabra@rrglobal.com",
            "Mobile": "9327251000"
        }
    ],
    "Progress Report": {
        "Construction / Booking Status Last Updated on": "29-12-2020",
        "Booking Status": {
            "A": {
                "Booked": "1",
                "Unbooked": "10"
            },
            "B": {
                "Booked": "2",
                "Unbooked": "9"
            },
            "C": {
                "Booked": "8",
                "Unbooked": "3"
            }
        },
        "Construction Status": {
            "A": "100.0%",
            "B": "100.0%",
            "C": "100.0%",
            "Common Amenities": "100.0%"
        }
    }
};

// Create data for charts
const bookingData = [
  { name: 'Tower A', booked: parseInt(projectData["Progress Report"]["Booking Status"]["A"]["Booked"]), unbooked: parseInt(projectData["Progress Report"]["Booking Status"]["A"]["Unbooked"]) },
  { name: 'Tower B', booked: parseInt(projectData["Progress Report"]["Booking Status"]["B"]["Booked"]), unbooked: parseInt(projectData["Progress Report"]["Booking Status"]["B"]["Unbooked"]) },
  { name: 'Tower C', booked: parseInt(projectData["Progress Report"]["Booking Status"]["C"]["Booked"]), unbooked: parseInt(projectData["Progress Report"]["Booking Status"]["C"]["Unbooked"]) },
];

const totalBookingData = [
  { name: 'Booked', value: parseInt(projectData["Progress Report"]["Booking Status"]["A"]["Booked"]) + 
                          parseInt(projectData["Progress Report"]["Booking Status"]["B"]["Booked"]) + 
                          parseInt(projectData["Progress Report"]["Booking Status"]["C"]["Booked"]) },
  { name: 'Available', value: parseInt(projectData["Progress Report"]["Booking Status"]["A"]["Unbooked"]) + 
                             parseInt(projectData["Progress Report"]["Booking Status"]["B"]["Unbooked"]) + 
                             parseInt(projectData["Progress Report"]["Booking Status"]["C"]["Unbooked"]) }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PropertyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold flex items-center">
            <Building className="mr-2" /> 
            {projectData["Project Details"]["Project Name"]} - RERA Project Details
          </h1>
          <p className="mt-1 text-blue-100">
            {projectData["Project Details"]["Project Type"]} | RERA: {projectData["Project Details"]["Registration Number"]}
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex space-x-4 overflow-x-auto">
            <button 
              className={`py-4 px-2 font-medium border-b-2 ${activeTab === 'overview' ? 'border-blue-500 text-blue-500' : 'border-transparent hover:text-blue-500'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`py-4 px-2 font-medium border-b-2 ${activeTab === 'details' ? 'border-blue-500 text-blue-500' : 'border-transparent hover:text-blue-500'}`}
              onClick={() => setActiveTab('details')}
            >
              Project Details
            </button>
            <button 
              className={`py-4 px-2 font-medium border-b-2 ${activeTab === 'promoter' ? 'border-blue-500 text-blue-500' : 'border-transparent hover:text-blue-500'}`}
              onClick={() => setActiveTab('promoter')}
            >
              Promoter & Directors
            </button>
            <button 
              className={`py-4 px-2 font-medium border-b-2 ${activeTab === 'construction' ? 'border-blue-500 text-blue-500' : 'border-transparent hover:text-blue-500'}`}
              onClick={() => setActiveTab('construction')}
            >
              Construction Status
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Key Project Info */}
            <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Key Project Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InfoItem 
                    icon={<Building />} 
                    label="Project Type" 
                    value={projectData["Project Details"]["Project Type"]} 
                  />
                  <InfoItem 
                    icon={<MapPin />} 
                    label="Location" 
                    value={projectData["Project Details"]["Project Address"]} 
                  />
                  <InfoItem 
                    icon={<Calendar />} 
                    label="Project Timeline" 
                    value={`${projectData["Project Details"]["Project Start Date"]} to ${projectData["Project Details"]["Project End Date"]}`} 
                  />
                </div>
                <div>
                  <InfoItem 
                    icon={<Home />} 
                    label="Total Units" 
                    value={projectData["Project Details"]["Total Units"]} 
                  />
                  <InfoItem 
                    icon={<CheckSquare />} 
                    label="Project Status" 
                    value={projectData["Project Details"]["Project Status"]} 
                  />
                  <InfoItem 
                    icon={<Users />} 
                    label="Developer" 
                    value={projectData["Promoter Details"]["Promoter Name"]} 
                  />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-medium mb-2 text-gray-700">About Property</h3>
                <p className="text-gray-600">{projectData["Project Details"]["About Property"]}</p>
              </div>
            </div>

            {/* Booking Status Overview */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Booking Status</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={totalBookingData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {totalBookingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-600">Last updated: {projectData["Progress Report"]["Construction / Booking Status Last Updated on"]}</p>
              </div>
            </div>
            
            {/* Construction Progress */}
            <div className="bg-white rounded-lg shadow p-6 md:col-span-3">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Tower-wise Booking Status</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={bookingData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="booked" name="Booked Units" stackId="a" fill="#0088FE" />
                    <Bar dataKey="unbooked" name="Available Units" stackId="a" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Project Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <DetailItem label="Registration Number" value={projectData["Project Details"]["Registration Number"]} />
                <DetailItem label="Project Name" value={projectData["Project Details"]["Project Name"]} />
                <DetailItem label="Project Type" value={projectData["Project Details"]["Project Type"]} />
                <DetailItem label="Approved Date" value={projectData["Project Details"]["Approved Date"]} />
                <DetailItem label="Project Land Area (Sq Mtrs)" value={projectData["Project Details"]["Project Land Area"]} />
                <DetailItem label="Total Covered Area (Sq Mtrs)" value={projectData["Project Details"]["Total Covered Area (Sq Mtrs)"]} />
                <DetailItem label="Project Start Date" value={projectData["Project Details"]["Project Start Date"]} />
                <DetailItem label="Project End Date" value={projectData["Project Details"]["Project End Date"]} />
                <DetailItem label="Project Status" value={projectData["Project Details"]["Project Status"]} />
                <DetailItem label="Average Carpet Area (Sq Mtrs)" value={projectData["Project Details"]["Average Carpet Area of Units (Sq Mtrs)"]} />
                <DetailItem label="Total Units" value={projectData["Project Details"]["Total Units"]} />
                <DetailItem label="Available Units" value={projectData["Project Details"]["Available Units"]} />
                <DetailItem label="Total Towers/Blocks" value={projectData["Project Details"]["Total No. of Towers/Blocks"]} />
                <DetailItem label="Plan Passing Authority" value={projectData["Project Details"]["Plan Passing Authority"]} />
                <DetailItem label="Website" value={projectData["Project Details"]["Website"]} isLink={true} />
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2 text-gray-700">Project Address</h3>
                <p className="text-gray-600">{projectData["Project Details"]["Project Address"]}</p>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2 text-gray-700">About Property</h3>
                <p className="text-gray-600">{projectData["Project Details"]["About Property"]}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'promoter' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Promoter Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Promoter Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <User className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">{projectData["Promoter Details"]["Promoter Name"]}</p>
                    <p className="text-gray-500 text-sm">{projectData["Promoter Details"]["Promoter Type"]}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="text-blue-500 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Contact</p>
                    <p className="text-gray-600">{projectData["Promoter Details"]["Contact"]}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="text-blue-500 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Email</p>
                    <p className="text-gray-600">{projectData["Promoter Details"]["Email Id"]}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Address</p>
                    <p className="text-gray-600">{projectData["Promoter Details"]["Address"]}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Directors Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Directors & Signatories</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Directors</h3>
                  <div className="space-y-4">
                    {projectData["Directors Details"].map((director, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-800">{director.Name}</p>
                        <div className="mt-2 text-sm text-gray-600 flex items-center">
                          <Mail className="w-4 h-4 mr-1" /> {director["Email Id"]}
                        </div>
                        <div className="mt-1 text-sm text-gray-600 flex items-center">
                          <Phone className="w-4 h-4 mr-1" /> {director.Mobile}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Authorized Signatories</h3>
                  <div className="space-y-4">
                    {projectData["Signatory Details"].map((signatory, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-800">{signatory.Name}</p>
                        <div className="mt-2 text-sm text-gray-600 flex items-center">
                          <Mail className="w-4 h-4 mr-1" /> {signatory["Email Id"]}
                        </div>
                        <div className="mt-1 text-sm text-gray-600 flex items-center">
                          <Phone className="w-4 h-4 mr-1" /> {signatory.Mobile}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'construction' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Construction & Booking Status</h2>
              <div className="text-sm text-gray-500">
                Last Updated: {projectData["Progress Report"]["Construction / Booking Status Last Updated on"]}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Construction Status */}
              <div>
                <h3 className="font-medium text-gray-700 mb-4">Construction Status</h3>
                <div className="space-y-4">
                  {Object.entries(projectData["Progress Report"]["Construction Status"]).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700">Tower {key}</span>
                        <span className="text-gray-700 font-medium">{value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: value }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Status */}
              <div>
                <h3 className="font-medium text-gray-700 mb-4">Booking Status</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={bookingData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="booked" name="Booked Units" fill="#0088FE" />
                      <Bar dataKey="unbooked" name="Available Units" fill="#00C49F" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  {Object.entries(projectData["Progress Report"]["Booking Status"]).map(([tower, status]) => (
                    <div key={tower} className="bg-gray-50 p-4 rounded-lg text-center">
                      <h4 className="font-medium text-gray-700 mb-2">Tower {tower}</h4>
                      <div className="text-sm">
                        <p><span className="text-blue-600 font-medium">{status.Booked}</span> Booked</p>
                        <p><span className="text-green-600 font-medium">{status.Unbooked}</span> Available</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 p-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">{projectData["Project Details"]["Project Name"]}</h3>
              <p className="text-sm">RERA: {projectData["Project Details"]["Registration Number"]}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <h3 className="text-lg font-semibold mb-2">Contact Developer</h3>
              <p className="text-sm flex items-center"><Phone className="w-4 h-4 mr-1" /> {projectData["Promoter Details"]["Contact"]}</p>
              <p className="text-sm flex items-center"><Mail className="w-4 h-4 mr-1" /> {projectData["Promoter Details"]["Email Id"]}</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700 text-sm">
            <p>Data sourced from Gujarat RERA | Generated on {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper components
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start mb-4">
    <div className="text-blue-500 mr-3 mt-1">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

const DetailItem = ({ label, value, isLink = false }) => (
  <div className="mb-2">
    <p className="text-sm text-gray-500">{label}</p>
    {isLink ? (
      <a href={`https://${value}`} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
        {value}
      </a>
    ) : (
      <p className="font-medium text-gray-800">{value}</p>
    )}
  </div>
);

export default PropertyDashboard;