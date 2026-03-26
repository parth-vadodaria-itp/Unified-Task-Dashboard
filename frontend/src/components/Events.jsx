import { useEffect, useState } from 'react'
import EventList from './EventList'
import axios from 'axios'

const Events = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [eventList, setEventList] = useState([])
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

    const authenticate = () => {
        window.location.href = `${apiBaseUrl}/gcalendar/auth/google`
    }

    const fetchEvents = () => {
        setIsLoading(true)
        axios
            .get(`${apiBaseUrl}/gcalendar/events`, {
                withCredentials: true,
            })
            .then((res) => {
                setIsAuthenticated(true)
                setEventList(res.data)
            })
            .catch((err) => {
                if (err.status === 401) setIsAuthenticated(false)
                else alert(err.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchEvents()
        if (!isAuthenticated) return

        let updateInterval = setInterval(fetchEvents, 5 * 60 * 1000)
        return () => clearInterval(updateInterval)
    }, [isAuthenticated])

    return (
        <>
            <section
                id="event-component"
                className="p-3 md:p-4 bg-section rounded-xl md:rounded-2xl shadow-[6px_6px_100px_rgba(0,0,0,0.1)]"
            >
                <header className="flex justify-between items-center">
                    <div className="text-xl md:text-2xl font-semibold">
                        <i className="ri-calendar-event-line text-green" />
                        <span> Events</span>
                    </div>
                    <button
                        onClick={isAuthenticated ? fetchEvents : authenticate}
                        className="p-2 md:p-3 rounded-lg md:rounded-xl bg-green hover:bg-hovergreen font-semibold text-white text-sm md:text-lg"
                    >
                        {isAuthenticated ? (
                            <>
                                <i
                                    className={`ri-refresh-line inline-block ${isLoading ? 'animate-spin' : ''}`}
                                />{' '}
                                Sync
                            </>
                        ) : (
                            <>
                                <i className="ri-login-circle-line" />{' '}
                                Authenticate
                            </>
                        )}
                    </button>
                </header>
                <main className="mt-8 grid gap-4">
                    <EventList eventList={eventList} />
                </main>
            </section>
        </>
    )
}

export default Events
