export async function getUser(userId) {
    const res = await fetch(
        `http://localhost:3000/api/user?userId=${userId}`, { next: { tags: ['userProfile'] } }
    );
    if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    return res.json();
}

export async function getReviews(userId) {
    const res = await fetch(
        `http://localhost:3000/api/review?userId=${userId}`, { next: { tags: ['userReviews'] } }
    );
    if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    return res.json();
}

export async function getAllReviews() {
    const res = await fetch(
        `http://localhost:3000/api/reviews`, { next: { tags: ['allReviews'] } }
    );
    if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    return res.json();
}

export async function getAllUsers() {
    const res = await fetch(
        `http://localhost:3000/api/allusers`, { next: { tags: ['allUsers'] } }
    );
    if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    return res.json();
}

export async function getTopic(topic) {
    const res = await fetch(
        `http://localhost:3000/api/topic?topic=${topic}`,
    );
    if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    return res.json();
}


export async function getLength() {
    const res = await fetch(
        `http://localhost:3000/api/length`, { next: { tags: ['lenght'] } }
    );
    if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    return res.json();
}