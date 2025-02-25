"use client"
import { forwardRef } from 'react';
import { Props } from '../../types';
import { useBase } from '../../hooks';
import Icon, { IconProps } from '../Icon';
import Span, { SpanProps } from '../Span';
import { FORMVALIDATION, Size, Variant } from '../../types/enums';

export type InputProps = Props<`input`> & {
    numeric?: boolean,
    size?: Size,
    variant?: Variant,
    with?: FORMVALIDATION
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {

    const { size, variant, numeric, ...pops } = props

    const {
        style,
        className,
        rest
    } = useBase<"input">(pops)

    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        if (numeric ) {
            event.currentTarget.value = event.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');            
        }
    }
 
    return <input
        className={`--input ${size || variant ? `--${size || variant}` : ``} flex ${className}`.trim()}
        style={style}
        onInput={handleInput}
        ref={ref}
        {...rest} />
        
})

export default Input