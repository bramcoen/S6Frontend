import React, { Component } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

export default function Header() {

        const { data: session } = useSession()
        let profileUrl = "";
        if (session != null && session.username !== undefined) {profileUrl = "/profile/"+session.username};
        return (
            <header className="p-3 bg-dark text-white">
                <div className="container">
                    <div
                        className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                  {/*      <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                            </svg>
                        </a>*/}

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link href="/" className="nav-link px-2 text-secondary">Home</Link></li>
                        </ul>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            {session != null && session.username !== undefined && <li><Link href={profileUrl} className="nav-link px-2 text-secondary">Profile</Link></li>}
                        </ul>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                            <input type="search" className="form-control form-control-dark" placeholder="Search..."
                                   aria-label="Search"/>
                        </form>

                        <div className="text-end">
                            {session &&
                            <>
                                Signed in as {session.username} <br/>
                                <button onClick={() => signOut()}>Sign out</button>
                            </>
                        }
                            {!session &&
                                <>
                                    Not signed in <br/>
                                    <button onClick={() => signIn()}>Sign in</button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </header>
        )
}


