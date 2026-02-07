import React, { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className = '', padding = 'md', children, ...props }, ref) => {

        const baseStyles = 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden text-slate-900 dark:text-slate-50 transition-colors duration-200';

        const paddings = {
            none: '',
            sm: 'p-3',
            md: 'p-5',
            lg: 'p-8',
        };

        const classes = `${baseStyles} ${paddings[padding]} ${className}`;

        return (
            <div ref={ref} className={classes} {...props}>
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

export { Card };
