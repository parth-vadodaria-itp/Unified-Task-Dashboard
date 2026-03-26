const EventList = ({ eventList }) => {
    return (
        <>
            {eventList.map((event) => (
                <div key={event.id}>
                    <section className="px-2 md:px-4 py-1 md:py-2 rounded-md md:rounded-xl bg-items flex items-center justify-between">
                        <div>
                            <div>{event.title}</div>
                            <div className="text-xs">
                                {new Date(
                                    event.start.dateTime
                                ).toLocaleTimeString()}{' '}
                                -{' '}
                                {new Date(
                                    event.end.dateTime
                                ).toLocaleTimeString()}
                            </div>
                        </div>
                        <a
                            href={event.link}
                            aria-label="open link"
                            className="text-sm md:text-xl text-border"
                            target="_blank"
                        >
                            <i className="ri-external-link-line p-0.5 rounded-lg hover:bg-red hover:text-white" />
                        </a>
                    </section>
                </div>
            ))}
        </>
    )
}

export default EventList
