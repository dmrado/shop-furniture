import React from 'react'

const SlugPage = ({ params }: { params: { slug: string } }) => {

    return (
        <div>
            id {params.slug}
        </div>
    )
}

export default SlugPage