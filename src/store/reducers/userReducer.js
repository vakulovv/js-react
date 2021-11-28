const initState = {
    users: [
        {
            name: 'Jane Cooper',
            title: 'Regional Paradigm Technician',
            department: 'Optimization',
            role: 'Admin',
            email: 'jane.cooper@example.com',
            image:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Vitaliy Vakulov',
            title: 'Regional Paradigm Technician',
            department: 'Optimization',
            role: 'Admin',
            email: 'vet20032003@list.ru',
            image:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        // More people...
    ]


}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            return state;
    }
    return state;
}

export default userReducer;