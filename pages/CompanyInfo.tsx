import React from 'react';
import { useLocation } from 'react-router-dom';
import { Shield, FileText, Info, Briefcase } from 'lucide-react';

export const CompanyInfo: React.FC = () => {
    const { pathname } = useLocation();

    const getPageContent = () => {
        switch (pathname) {
            case '/about':
                return {
                    title: "About HomeSolutions",
                    icon: <Info className="w-12 h-12 text-indigo-500" />,
                    content: "HomeSolutions is the world's first AI-powered home services marketplace. We use agentic AI to match homeowners with the most qualified, vetted professionals in their local area. Our mission is to simplify home maintenance while ensuring elite quality standards."
                };
            case '/careers':
                return {
                    title: "Join the Innovation",
                    icon: <Briefcase className="w-12 h-12 text-indigo-500" />,
                    content: "We're always looking for talented individuals to join our mission of redefining home care. From AI engineers to operations experts, help us build the future of localized service delivery."
                };
            case '/privacy':
                return {
                    title: "Privacy Policy",
                    icon: <Shield className="w-12 h-12 text-indigo-500" />,
                    content: "Your privacy is our priority. We employ end-to-end encryption for all user data and never share your personal information with third parties without explicit consent. Our AI only accesses relevant project data to provide accurate matches."
                };
            case '/terms':
                return {
                    title: "Terms of Service",
                    icon: <FileText className="w-12 h-12 text-indigo-500" />,
                    content: "By using HomeSolutions, you agree to our quality commitment and professional standards. All service providers are independently vetted but operate through our platform's secure clearinghouse to guarantee satisfaction."
                };
            default:
                return {
                    title: "Information",
                    icon: <Info className="w-12 h-12 text-indigo-500" />,
                    content: "Pardon our dust. This section of the neural network is still being calibrated."
                };
        }
    };

    const { title, icon, content } = getPageContent();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-slate-50 dark:bg-slate-950">
            <div className="glass max-w-2xl w-full p-12 rounded-[2.5rem] border border-white/10 shadow-2xl animate-fade-in-up">
                <div className="mb-8 p-4 bg-indigo-500/10 rounded-2xl inline-block">
                    {icon}
                </div>
                <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-6 uppercase italic">
                    {title}
                </h1>
                <div className="h-[1px] w-20 bg-indigo-500 mb-8"></div>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {content}
                </p>
                <div className="mt-12 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                    Verified Page System v2.6
                </div>
            </div>
        </div>
    );
};
