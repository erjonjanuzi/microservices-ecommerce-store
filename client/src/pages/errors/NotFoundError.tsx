import { Image } from "semantic-ui-react";

export default function NotFound() {
    return (
        <div style={{ minHeight: '100vh', marginTop: '50px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Image src='/assets/illustrations/page-not-found.svg' size='large' />
                <br />
                <h1>The page you're looking for does not exist</h1>
            </div>
        </div>
    )
}