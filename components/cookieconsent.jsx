'use client';

import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';

function HoverButton({ onClick, label }) {
    const [hover, setHover] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                padding: '6px 10px',
                fontSize: '14px',
                cursor: 'pointer',
                border: '1px solid black',
                borderRadius: '5px',
                backgroundColor: hover ? '#f0f0f0' : '#ffffff',
                color: '#000',
                transition: 'background-color 0.2s ease',
            }}
        >
            {label}
        </button>
    );
}

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const [showCustomize, setShowCustomize] = useState(false);
    const [showManageButton, setShowManageButton] = useState(false);
    const [preferences, setPreferences] = useState({
        necessary: true,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        // Remove this line after testing if you want the cookie to persist
        Cookie.remove('cookieConsent'); 

        const consent = Cookie.get('cookieConsent');
        if (!consent) {
            setShowBanner(true);
            setShowManageButton(false);
        } else {
            try {
                setPreferences(JSON.parse(consent));
            } catch {
                setPreferences({
                    necessary: true,
                    analytics: false,
                    marketing: false,
                });
            }
            setShowBanner(false);
            setShowManageButton(true);
        }
    }, []);

    const handleManageCookiesClick = () => {
        const consent = Cookie.get('cookieConsent');
        if (consent) {
            try {
                setPreferences(JSON.parse(consent));
            } catch {
                setPreferences({
                    necessary: true,
                    analytics: false,
                    marketing: false,
                });
            }
        }
        setShowBanner(true);
        setShowCustomize(true);
    };

    const handleAcceptAll = () => {
        Cookie.set(
            'cookieConsent',
            JSON.stringify({ necessary: true, analytics: true, marketing: true }),
            { expires: 365 }
        );
        setShowBanner(false);
        setShowManageButton(true);
    };

    const handleDenyAll = () => {
        Cookie.set(
            'cookieConsent',
            JSON.stringify({ necessary: true, analytics: false, marketing: false }),
            { expires: 365 }
        );
        setShowBanner(false);
        setShowManageButton(true);
    };

    const handleSavePreferences = () => {
        Cookie.set('cookieConsent', JSON.stringify(preferences), { expires: 365 });
        setShowBanner(false);
        setShowManageButton(true);
    };

    // Show the cookie consent banner if showBanner is true
    return (
        <>
            {showBanner && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: '#fff',
                        textAlign: 'center',
                        borderTop: '1px solid #ccc',
                        padding: '1rem',
                        zIndex: 1000,
                    }}
                >
                    <h2>We use cookies.</h2>
                    <p>This site uses cookies to improve your experience. You can customize your preferences.</p>

                    {showCustomize ? (
                        <div>
                            <label>
                                <input type="checkbox" checked disabled /> Necessary (Always On)
                            </label>
                            <br />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={preferences.analytics}
                                    onChange={e =>
                                        setPreferences(p => ({ ...p, analytics: e.target.checked }))
                                    }
                                />{' '}
                                Analytics
                            </label>
                            <br />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={preferences.marketing}
                                    onChange={e =>
                                        setPreferences(p => ({ ...p, marketing: e.target.checked }))
                                    }
                                />{' '}
                                Marketing
                            </label>
                            <br />
                            <div style={{ marginTop: '10px' }}>
                                <HoverButton onClick={handleSavePreferences} label="Save Preferences" />
                            </div>
                        </div>
                    ) : (
                        <div
                            style={{
                                marginTop: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '10px',
                            }}
                        >
                            <HoverButton onClick={handleAcceptAll} label="Accept All" />
                            <HoverButton onClick={handleDenyAll} label="Deny All" />
                            <HoverButton onClick={() => setShowCustomize(true)} label="Customize" />
                        </div>
                    )}
                </div>
            )}

            {/* Manage Cookies button shows when banner hidden but user consent exists */}
            {showManageButton && !showBanner && (
                <button
                    onClick={handleManageCookiesClick}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        padding: '10px 14px',
                        fontSize: '13px',
                        border: '1px solid black',
                        backgroundColor: '#fff',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        boxShadow: '0 0 5px rgba(0,0,0,0.1)'
                    }}
                >
                    Manage Cookies
                </button>
            )}
        </>
    );
}
