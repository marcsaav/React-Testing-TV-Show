import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'


import { fetchShow as mockFetchShow } from './api/fetchShow'
jest.mock('./api/fetchShow.js')

const mockData = {
        "id": 2993,
        "url": "http://www.tvmaze.com/shows/2993/stranger-things",
        "name": "Stranger Things",
        "type": "Scripted",
        "language": "English",
        "genres": [
            "Drama",
            "Fantasy",
            "Science-Fiction"
        ],
        "status": "Running",
        "runtime": 60,
        "premiered": "2016-07-15",
        "officialSite": "https://www.netflix.com/title/80057281",
        "schedule": {
            "time": "",
            "days": []
        },
        "rating": {
            "average": 8.7
        },
        "weight": 99,
        "network": null,
        "webChannel": {
            "id": 1,
            "name": "Netflix",
            "country": null
        },
        "externals": {
            "tvrage": 48493,
            "thetvdb": 305288,
            "imdb": "tt4574334"
        },
        "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/200/501942.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg"
        },
        "summary": "<p>A love letter to the '80s classics that captivated a generation, <b>Stranger Things</b> is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.</p>",
        "updated": 1604039949,
        "_links": {
            "self": {
                "href": "http://api.tvmaze.com/shows/2993"
            },
            "previousepisode": {
                "href": "http://api.tvmaze.com/episodes/1576476"
            }
        },
        "_embedded": {
            "episodes": [
                {
                    season: 1,
                    number: 1,
                    name: 'Marcos gets Here'
                },
                {
                    season: 1,
                    number: 2,
                    name: 'Marcos goes There'
                }
            ]
        }
}

test('renders App successfully', () => {
    mockFetchShow.mockResolvedValueOnce(mockData)
    render(<App />)
})

test('useEffect and dropdown works as intended', async () => {
    mockFetchShow.mockResolvedValueOnce(mockData)
    render(<App />)

    const dropdown = await screen.findByText(/select a season/i)
    userEvent.click(dropdown)
    const season = await screen.findByText(/season 1/i)
    userEvent.click(season)

    await waitFor(() => {
        const episodes = screen.queryAllByTestId('episode')
        expect(episodes.length === 2)
    })
})