import { db } from '../database/db'

const fetchAllCategories = async () => {
    const categories = await db.categories.toArray()
    return categories
}

export { fetchAllCategories }
