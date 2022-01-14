import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'

export default function FirstPost() {
    return (
        <>
            <Head>
                <title>First Post working</title>
            </Head>
            <Script
                src={""}
                strategy="lazyOnLoad"
                onLoad={() =>
                console.log('script loaded correctly, window has populated')
                }
            />
            <h1>First Post ok this is working</h1>
            <h2>
                <Link href="/">
                    <a> Back to home </a>
                </Link>
            </h2>
        </>
        )
}