import { useRouter } from 'next/router'; // tp get access to parameter in url

const Profile = () => {
    const router = useRouter();
    const { username } = router.query;
    return <div> This is profile of {username}!</div>;
}

export default Profile;

