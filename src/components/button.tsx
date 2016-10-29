import {style} from 'typestyle';
import * as csx from 'typestyle/csx';
import * as React from 'react';
import {colors, fontSizes} from './styles';

export namespace ButtonStyles {
  const baseStyle = {
    cursor: 'pointer',
    height: 'auto',
    padding: "12px 30px 11px",
    border: `1px solid ${colors.header}`,
    borderRadius: '3px',
    color: colors.header,
    backgroundColor: colors.white,
    fontSize: fontSizes.buttonText,
    textDecoration: "none",
    lineHeight: "1em",
    outline: 'none',
    transition: 'color .2s, background-color .2s',
    '&:focus': {
      outline: 'thin dotted',
      outlineColor: colors.header
    }
  };

  export const primaryClassName = style(baseStyle, {
    display: 'inline-block',
    color: colors.white,
    backgroundColor: colors.header,
    '&:hover': {
      backgroundColor: colors.headerHover,
    },
    '&:active': {
      backgroundColor: colors.headerHover,
    }
  });
}

interface ButtonProps {
  text: string;
  onClick?: () => any;
  disabled?: boolean;
  width?: string;
}

export const PrimaryButton = ({text, onClick, disabled, width = "auto"}: ButtonProps) => {
  return (
    <button className={ButtonStyles.primaryClassName} type="button" onClick={onClick} disabled={disabled} style={{width}}>
      <span>{text}</span>
    </button>
  );
}