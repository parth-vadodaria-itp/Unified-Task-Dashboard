import { Dexie } from 'dexie'

export const db = new Dexie('TodoDB')

db.version(1).stores({
    tasks: '++id',
    categories: '++id',
    priorities: '++id',
})

db.on('populate', async () => {
    const populateCategories = db.categories.bulkAdd([
        { title: 'Work', color: '#4F6D7A' },
        { title: 'Hobby', color: '#8A6FA8' },
        { title: 'Health', color: '#7A9E7E' },
        { title: 'Shopping', color: '#C27A86' },
        { title: 'Other', color: '#8C857C' },
    ])

    const populatePriorities = db.priorities.bulkAdd([
        { title: 'low', color: 'red' },
        { title: 'medium', color: 'yellow' },
        { title: 'high', color: 'green' },
    ])

    await Promise.all(populateCategories, populatePriorities)
})
