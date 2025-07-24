export const threshhold = { 
    point: [
        {
            min: 0,
            max: 1,
            class: 'text-light'
        }, 
        {
            min: 1,
            max: 2.0,
            class: 'text-medium'
        },
        {
            min: 2.0, 
            max: +Infinity,
            class: 'text-strong'
        },
        {
            min: -1,
            max: 0,
            class: 'text-light-negative'
        }, 
        {
            min: -2.5,
            max: -1,
            class: 'text-medium-negative'
        },
        {
            min: -Infinity, 
            max: -2.5,
            class: 'text-strong-negative'
        }
    ],
    coeff: [
        {
            min: 0,
            max: 0,
            class: 'text-hide'
        },
        {
            min: 0,
            max: 0.10,
            class: 'text-light'
        },
        {
            min: 0.10,
            max: 0.25,
            class: 'text-medium'
        },
        {
            min: 0.25, 
            max: Infinity,
            class: 'text-strong'
        },
    
        {
            min: -Infinity,
            max: -0.25,
            class: 'text-strong-negative'
        },
        {
            min: -0.25,
            max: -0.10,
            class: 'text-medium-negative'
        },
        {
            min: -0.10,
            max: 0,
            class: 'text-light-negative'
        }
    ]
}

export const sorts = [
    {id: 0, name: 'По названию команды', code: 'team_name', order: 'asc'},
    {id: 1, name: 'По названию лиги', code: 'league_name', order: 'asc'},
    {id: 2, name: 'По времени движения', code: 'last_change', order: 'desc'},
    {id: 3, name: 'По кол-ву движений', code: 'change_count', order: 'desc'},
    {id: 4, name: 'По времени начала матча', code: 'start_time', order: 'asc'},
]
// export const orders = [
//     {id: 1, name: 'По убыванию', code: 'desc'},
//     {id: 2, name: 'По возрастанию', code: 'asc'},
// ]