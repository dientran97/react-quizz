import React from 'react'

const Home = () => {
    return (
        <>
            <h2>Home</h2>
            {localStorage.getItem('accessToken') ? null : <h3>Please login!!!</h3>}
        </>
    )
}

export default Home
