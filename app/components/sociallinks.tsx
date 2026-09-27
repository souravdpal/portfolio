import React from "react";
import { Mail } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./icons";

// Replace these three with your real profile URLs and inbox.
const SOCIALS = [
    { label: "GitHub", href: "https://github.com/souravdpal", icon: <GithubIcon size={17} /> },
    { label: "Instagram", href: "https://instagram.com/itz_srvsourav", icon: <InstagramIcon size={17} /> },
    { label: "LinkedIn", href: "https://linkedin.com/in/souravdp", icon: <LinkedinIcon size={17} /> },
    { label: "Email", href: "mailto:iamsouravhere1@gmail.com", icon: <Mail size={17} /> },
];

export function SocialLinks() {
    return (
        <div className="social-row">
            {SOCIALS.map((social) => {
                const external = social.href.startsWith("http");
                return (
                    <a
                        key={social.label}
                        href={social.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="social-link"
                        aria-label={social.label}
                        title={social.label}
                    >
                        {social.icon}
                    </a>
                );
            })}
        </div>
    );
}