"use client";

import React, { useState, useEffect } from "react";
import { Stethoscope, Send, AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";
import Layout from "@/components/Layout";
import WaveformLoader from "../../components/Waveform";

const checkupApi =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";

type Diagnosis = {
  response: string;
  severity?: string;
  recommendation?: string;
};

const Accordion: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-2">
      <button
        type="button"
        className="w-full flex justify-between items-center px-4 py-2 bg-blue-100 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-semibold text-blue-800">{title}</span>
        <span className="ml-2 text-blue-600">{open ? "-" : "+"}</span>
      </button>
      {open && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-b animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

const AICheckup = () => {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!symptoms || !age || !gender) return;
    try {
      setIsProcessing(true);
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

      const message = `Please analyze the following patient information and provide a health assessment:\nPatient Age: ${age}\nGender: ${gender}\nSymptoms: ${symptoms}\n${
        medicalHistory ? `Medical History: ${medicalHistory}` : ""
      }\nPlease provide: 1. A summary of the potential health condition 2. Severity assessment 3. Recommendations for treatment and care 4. Any warning signs to watch for. PLEASE PROVIDE YOUR RESPONSE AS AN OBJECT WITH FOLLOWING FEILDS : 1. severity 2. response 3. recommendation - whether the patient shall consult a doctor or not. Use the following JSON format:\n\n\`\`\`json\n{\n  "severity": "mild/moderate/severe",\n  "response": "Detailed analysis of symptoms and potential condition",\n  "recommendation": "Treatment options, care instructions, warning signs"\n}\n\`\`\``;
      const response = await axios.post(`${checkupApi}${apiKey}`, {
        contents: [
          {
            parts: [
              {
                text: message,
              },
            ],
          },
        ],
      });
      const geminiText =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!geminiText) throw new Error("No response from Gemini API");
      const parsedResponse = JSON.parse(
        geminiText.replace(/```json\n|\n```/g, "")
      );
      setDiagnosis({
        response: parsedResponse.response,
        severity: parsedResponse.severity,
        recommendation:
          typeof parsedResponse.recommendation === "object"
            ? `Treatment: ${parsedResponse.recommendation.treatment}\n\nCare: ${parsedResponse.recommendation.care}\n\nWarning Signs: ${parsedResponse.recommendation.warning_signs}`
            : parsedResponse.recommendation,
      });

      console.log("Diagnosis response:", parsedResponse);
    } catch (error) {
      setDiagnosis(null);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout role="patient">
      <div className="min-h-screen rounded-2xl flex items-center justify-center py-10 bg-gradient-to-br from-blue-100 to-white">
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden bg-white">
          {/* Left Section - Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-10 bg-gradient-to-b from-blue-50 to-white">
            <div className="flex items-center justify-center mb-8">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <Stethoscope className="w-7 h-7 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-center text-blue-900 mb-4 tracking-tight">
              Instant Health Checkup
            </h1>
            <form onSubmit={handleSubmit} className="text-blue-700 space-y-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">
                    Age*
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-2 text-base border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">
                    Gender*
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Describe your symptoms*
                </label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full px-4 py-2 text-base border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-28 bg-blue-50"
                  placeholder="Please describe your symptoms in detail..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Medical History (Optional)
                </label>
                <textarea
                  value={medicalHistory}
                  onChange={(e) => setMedicalHistory(e.target.value)}
                  className="w-full px-4 py-2 text-base border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 bg-blue-50"
                  placeholder="Any existing conditions, allergies, or medications..."
                />
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 text-base font-semibold shadow transition-all duration-150 ${
                  isProcessing
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Get Assessment</span>
                  </>
                )}
              </button>
            </form>
          </div>
          {/* Right Section - Results */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-10 bg-gradient-to-b from-white to-blue-50 border-l border-blue-100">
            <div className="flex items-center justify-center mb-6">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-7 h-7 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">
              Assessment Results
            </h2>
            {!diagnosis && !isProcessing && (
              <div className="flex flex-col items-center justify-center h-[200px] text-blue-300">
                <Send className="w-12 h-12 mb-4" />
                <p>Submit your symptoms to get an assessment</p>
              </div>
            )}
            {isProcessing && (
              <div className="flex flex-col items-center justify-center h-[200px]">
                <WaveformLoader />
                <p className="text-blue-600">Analyzing your symptoms...</p>
              </div>
            )}
            {diagnosis && (
              <div className="space-y-6">
                <Accordion title="Analysis">
                  <div className="text-blue-700 whitespace-pre-wrap max-h-56 overflow-y-auto pr-2">
                    {diagnosis.response}
                  </div>
                </Accordion>
                {diagnosis.severity && (
                  <Accordion title="Severity Level">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
                      <h3 className="font-semibold text-blue-800">
                        {diagnosis.severity}
                      </h3>
                    </div>
                  </Accordion>
                )}
                {diagnosis.recommendation && (
                  <Accordion title="Recommendations">
                    <p className="text-blue-700 whitespace-pre-wrap max-h-56 overflow-y-auto pr-2">
                      {diagnosis.recommendation}
                    </p>
                  </Accordion>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AICheckup;
