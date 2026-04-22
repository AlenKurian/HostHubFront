import { Link } from "react-router-dom";
import {
    FiTicket,
    FiTwitter,
    FiInstagram,
    FiLinkedin,
    FiGithub,
} from "react-icons/fi";

const footerLinks = {
    product: {
        title: "Product",
        links: [
            { name: "Features", href: "/features" },
            { name: "Pricing", href: "/pricing" },
            { name: "Integrations", href: "/integrations" },
            { name: "API", href: "/api" },
        ],
    },
    company: {
        title: "Company",
        links: [
            { name: "About", href: "#about" },
            { name: "Blog", href: "/blog" },
            { name: "Careers", href: "/careers" },
            { name: "Contact", href: "#contact" },
        ],
    },
    resources: {
        title: "Resources",
        links: [
            { name: "Help Center", href: "/help" },
            { name: "Guides", href: "/guides" },
            { name: "Community", href: "/community" },
            { name: "Webinars", href: "/webinars" },
        ],
    },
    legal: {
        title: "Legal",
        links: [
            { name: "Privacy", href: "/privacy" },
            { name: "Terms", href: "/terms" },
            { name: "Cookies", href: "/cookies" },
            { name: "Licenses", href: "/licenses" },
        ],
    },
};

const socialLinks = [
    { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FiInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FiGithub, href: "https://github.com", label: "GitHub" },
];

const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8">

                    <div className="col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                                <FiTicket className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">
                                Host<span className="text-blue-600">Hub</span>
                            </span>
                        </Link>

                        <p className="text-gray-600 text-sm mb-6 max-w-xs">
                            The modern platform for discovering, managing, and booking
                            unforgettable events.
                        </p>

                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg bg-white border
                             flex items-center justify-center
                             text-gray-600 hover:text-blue-600
                             hover:border-blue-600 transition"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {Object.values(footerLinks).map((section) => (
                        <div key={section.title}>
                            <h4 className="font-semibold text-gray-900 mb-4">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        {link.href.startsWith("#") ? (
                                            <a
                                                href={link.href}
                                                className="text-sm text-gray-600 hover:text-blue-600 transition"
                                            >
                                                {link.name}
                                            </a>
                                        ) : (
                                            <Link
                                                to={link.href}
                                                className="text-sm text-gray-600 hover:text-blue-600 transition"
                                            >
                                                {link.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-gray-200
                        flex flex-col sm:flex-row justify-between
                        items-center gap-4">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} HostHub. All rights reserved.
                    </p>
                    <p className="text-sm text-gray-500">
                        Made with love for event lovers
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
