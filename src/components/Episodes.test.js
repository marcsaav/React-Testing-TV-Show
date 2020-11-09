import React from 'react'
import { render, screen } from '@testing-library/react'
import Episodes from './Episodes'

test('renders Episodes without errors', () => {
    render(<Episodes episodes={[]} />)
})

test('renders with a change in props', () => {
    const {rerender} = render(<Episodes episodes={[]} />)

    let episodeObjects = screen.queryAllByTestId('episode')

    expect(episodeObjects === [])

    rerender(<Episodes episodes={[
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
    ]} />)

    episodeObjects = screen.queryAllByTestId('episode')

    expect(episodeObjects.length === 2)
})