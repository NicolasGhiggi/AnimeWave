import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Footer = () => {
    return (
        <footer className="py-10 mt-14 border-t border-input">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 pb-5">
                    <div className="sm:col-span-2">
                        <Link href="/" aria-label="Go home" title="Animewave" className="inline-flex items-center">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="40px" height="40px"
                                 className="text-primary" viewBox="0 0 512.000000 512.000000"
                                 preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                   stroke="none" fill="currentColor">
                                    <path
                                        d="M644 4993 c26 -485 176 -920 467 -1358 212 -318 473 -612 878 -988 l94 -87 -94 -87 c-405 -376 -666 -670 -878 -988 -292 -440 -442 -873 -467 -1358 l-7 -127 320 0 320 0 7 110 c8 139 37 307 73 430 l28 95 1175 0 1174 0 23 -75 c38 -124 64 -267 76 -417 l11 -143 320 0 319 0 -7 128 c-36 675 -317 1268 -908 1911 l-68 75 -22 -21 c-200 -178 -439 -396 -443 -404 -4 -5 33 -53 82 -107 49 -53 127 -142 172 -197 l82 -100 -405 -3 c-223 -1 -589 -1 -812 0 l-406 3 108 130 c148 179 519 547 889 881 619 558 857 798 1100 1109 372 477 577 967 625 1495 5 63 10 139 10 168 l0 52 -318 0 -318 0 -11 -142 c-12 -151 -38 -294 -77 -418 l-23 -75 -1174 0 -1174 0 -28 95 c-36 123 -65 291 -73 430 l-7 110 -320 0 -320 0 7 -127z m2715 -1170 c-105 -138 -250 -296 -475 -520 -151 -150 -285 -280 -299 -289 -24 -16 -27 -15 -63 12 -20 16 -154 146 -298 289 -215 214 -359 372 -463 508 -13 16 27 17 799 17 772 0 812 -1 799 -17z"/>
                                </g>
                            </svg>
                            <span className="ml-2 text-2xl font-bold tracking-wide">AnimeWave</span>
                        </Link>
                        <div className="mt-6 lg:max-w-sm">
                            <p className="text-sm opacity-80">
                                Discover the best of animation with AnimeWave. Enjoy your favorite anime and discover new series every day.
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center mt-4">
                            <Button variant="ghost" size={"icon"} asChild>
                                <Link href="https://instagram.com">
                                    <i className="ri-instagram-line text-2xl"/>
                                </Link>
                            </Button>
                            <Button variant="ghost" size={"icon"} asChild>
                                <Link href="https://youtube.com">
                                    <i className="ri-youtube-line text-2xl"/>
                                </Link>
                            </Button>
                            <Button variant="ghost" size={"icon"} asChild>
                                <Link href="https://twitter.com">
                                    <i className="ri-twitter-line text-2xl"/>
                                </Link>
                            </Button>
                            <Button variant="ghost" size={"icon"} asChild>
                                <Link href="https://github.com">
                                    <i className="ri-github-line text-2xl" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-3 pt-5 border-t border-accent">
                    <p className="text-sm max-w-full md:max-w-[70%] text-center">
                        2024 AnimeWave &#169; All rights reserved.<span className="opacity-80"> All content on this
                        site, including text, images, and graphics, is protected by copyright law and may not be
                        reproduced or distributed without permission. Thank you for supporting AnimeWave and respecting
                        our intellectual property.</span>
                    </p>
                    <ul className="text-center flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                        <li>
                            <Button variant="link" asChild>
                                <Link href="/">
                                    F.A.Q
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button variant="link" asChild>
                                <Link href="/">
                                    Privacy Policy
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button variant="link" asChild>
                                <Link href="/">
                                    Terms & Conditions
                                </Link>
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}