// container.tsx
import { forwardRef } from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
}

const Container = forwardRef<HTMLDivElement, Props>(({ children, className }, ref) => {
    return (
        <div 
            ref={ref}
            className={`flex max-w-400 mx-auto w-full py-6 px-4 ${className || ''}`}
        >
            {children}
        </div>
    );
});

Container.displayName = 'Container';

export default Container;