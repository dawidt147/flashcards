import Link from 'next/link';

export default function Menu() {
    return (
        <nav className="menu">
            <ul className='flex gap-2'>
                <li>
                    <Link href="/products">Products</Link>
                </li>
                <li>
                    <Link href="/about-us">About-us</Link>
                </li>
            </ul>
        </nav>
    );
}