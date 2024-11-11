import ExampleForm from '@/components/example-form/example-form';

export default function Home() {
    return (
        <div className="mx-auto my-4 max-w-screen-md space-y-8 px-2 md:px-0">
            <h2 className="text-3xl font-medium">Example application</h2>
            <ExampleForm />
        </div>
    );
}
