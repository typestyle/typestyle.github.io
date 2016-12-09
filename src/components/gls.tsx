/**
 * This is a level above CSX
 *  - It wraps up the CSX primitives into components
 */
import * as typestyle from 'typestyle';
import * as React from "react";
import * as csstips from 'csstips';

/**
 * Defaults used in layout
 */
let defaultValues = {
  spacing: 24,

  breakpoints: {
    phone: 480,
  }
}
export function setDefaults(defaults: typeof defaultValues) {
  defaultValues = defaults;
}

/** Creates a copy of an object without the mentioned keys */
function _objectWithoutProperties(obj: any, keys: string[]) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

declare global {
  interface Function {
    displayName?: string;
  }
}

/********
 *
 * Primitives
 *
 ********/

/**
* For that time you just need a visual vertical seperation
*/
export const SmallVerticalSpace = (props: { space?: number }) => {
  return <div style={{ height: props.space || defaultValues.spacing }}></div>;
}
SmallVerticalSpace.displayName = "SmallVerticalSpace";

/**
 * For that time you just need a visual horizontal seperation
 */
export const SmallHorizontalSpace = (props: { space?: number }) => {
  return <div style={{ width: props.space || defaultValues.spacing, display: 'inline-block' }}></div>;
}
SmallVerticalSpace.displayName = "SmallHorizontalSpace";

interface PrimitiveProps extends React.HTMLProps<HTMLDivElement> { };

namespace ClassNames {
  export const content = typestyle.style(csstips.content);
  export const flex = typestyle.style(csstips.pass, csstips.flex);
  export const flexScrollY = typestyle.style(csstips.pass, csstips.flex, csstips.vertical, { overflowY: 'auto' });
  export const pass = typestyle.style(csstips.pass);
  export const contentVertical = typestyle.style(csstips.content, csstips.vertical);
  export const contentVerticalCentered = typestyle.style(csstips.content, csstips.vertical, csstips.center);
  export const flexVerticalCentered = typestyle.style(csstips.flex, csstips.vertical, csstips.center);
  export const contentHorizontal = typestyle.style(csstips.content, csstips.horizontal);
  export const contentHorizontalCentered = typestyle.style(csstips.content, csstips.horizontal, csstips.center);
  export const flexVertical = typestyle.style(csstips.flex, csstips.vertical, { maxWidth: '100%' /*normalizing browser bugs*/ });
  export const flexHorizontal = typestyle.style(csstips.flex, csstips.horizontal);
}

/**
 * Generally prefer an inline block (as that will wrap).
 * Use this for critical `content` driven *vertical* height
 *
 * Takes as much space as it needs, no more, no less
 */
export const Content = (props: PrimitiveProps) => {
  const className = ClassNames.content + (props.className ? ` ${props.className}` : '');
  return (
    <div data-comment="Content" {...props} className={className}>
      {props.children}
    </div>
  );
};
Content.displayName = "Content";

/**
 * Takes as much space as it needs, no more, no less
 */
export const InlineBlock = (props: PrimitiveProps) => {
  const style = typestyle.extend({ display: 'inline-block' }, props.style as any || {}) as any;
  return (
    <div data-comment="InlineBlock" {...props} style={style}>
      {props.children}
    </div>
  );
};
InlineBlock.displayName = "InlineBlock";


/**
 * Takes up all the parent space, no more, no less
 */
export const Flex = (props: PrimitiveProps) => {
  const className = ClassNames.flex + (props.className ? ` ${props.className}` : '');
  return (
    <div data-comment="Flex" {...props} className={className}>
      {props.children}
    </div>
  );
};
Flex.displayName = "Flex";

/**
 * For that time you want to limit the size but flex otherwise
 */
export const FlexMaxWidth = (props: PrimitiveProps & { maxWidth: number }) => {
  const {maxWidth} = props;
  const otherProps = _objectWithoutProperties(props, ['maxWidth', 'children', 'style']);

  const className = ClassNames.flex + (props.className ? ` ${props.className}` : '');
  const maxWidthStyle = { maxWidth };
  const style = (props.style ? typestyle.extend(props.style as any, maxWidthStyle) : maxWidthStyle);
  return (
    <div data-comment="FlexMaxWidth" {...otherProps} className={className} style={maxWidthStyle}>
      {props.children}
    </div>
  );
}
FlexMaxWidth.displayName = "FlexMaxWidth";

/**
 * Takes up all the parent space, no more, no less and scrolls the children in Y if needed
 */
export const FlexScrollY = (props: PrimitiveProps) => {
  const className = ClassNames.flexScrollY + (props.className ? ` ${props.className}` : '');
  return (
    <div data-comment="FlexScrollY" {...props} className={className}>
      {props.children}
    </div>
  );
};
FlexScrollY.displayName = "FlexScrollY";

/**
 * When you need a general purpose container. Use this instead of a `div`
 */
export const Pass = (props: PrimitiveProps) => {
  const className = ClassNames.pass + (props.className ? ` ${props.className}` : '');
  return (
    <div data-comment="Pass" {...props} className={className}>
      {props.children}
    </div>
  );
};
Pass.displayName = "Pass";

/**
 * Provides a Vertical Container. For the parent it behaves like content.
 */
export const ContentVertical = (props: PrimitiveProps) => {
  const className = ClassNames.contentVertical + (props.className ? ` ${props.className}` : '');
  return (
    <div data-comment="ContentVertical" {...props} className={className}>
      {props.children}
    </div>
  );
};
ContentVertical.displayName = "ContentVertical";

/**
 * Quite commonly need horizontally centered text
 */
export const ContentVerticalCentered = (props: PrimitiveProps) => {
  const className = ClassNames.contentVerticalCentered + (props.className ? ` ${props.className}` : '');
  return (
    <div data-comment="ContentVerticalCentered" {...props} className={className}>
      {props.children}
    </div>
  );
}
ContentVerticalCentered.displayName = "ContentVerticalCentered";

/**
 * Quite commonly need horizontally centered text
 */
export const FlexVerticalCentered = (props: PrimitiveProps) => {
  const className = ClassNames.flexVerticalCentered + (props.className ? ` ${props.className}` : '');
  return (
    <div data-comment="FlexVerticalCentered" {...props} className={className}>
      {props.children}
    </div>
  );
}
FlexVerticalCentered.displayName = "FlexVerticalCentered";

/**
 * Provides a Horizontal Container. For the parent it behaves like content.
 */
export const ContentHorizontal = (props: PrimitiveProps) => {
  const className = ClassNames.contentHorizontal + (props.className ? ` ${props.className}` : '');
  return (
    <div data-comment="ContentHorizontal" {...props} className={className}>
      {props.children}
    </div>
  );
};
ContentHorizontal.displayName = "ContentHorizontal";

/**
 * Provides a Horizontal Container and centers its children in the cross dimension
 */
export const ContentHorizontalCentered = (props: PrimitiveProps) => {
  const className = ClassNames.contentHorizontalCentered + (props.className ? ` ${props.className}` : '');
  return (
    <div data-comment="ContentHorizontalCentered" {...props} className={className}>
      {props.children}
    </div>
  );
};
ContentHorizontalCentered.displayName = "ContentHorizontalCentered";

/**
 * Provides a Vertical Container. For the parent it behaves like flex.
 */
export const FlexVertical = (props: PrimitiveProps) => {
  const className = ClassNames.flexVertical + (props.className ? ` ${props.className}` : '');
  return (
    <div data-comment="FlexVertical" {...props} className={className}>
      {props.children}
    </div>
  );
};
FlexVertical.displayName = "FlexVertical";

/**
 * Provides a Horizontal Container. For the parent it behaves like flex.
 */
export const FlexHorizontal = (props: PrimitiveProps) => {
  const className = ClassNames.flexHorizontal + (props.className ? ` ${props.className}` : '');
  return (
    <div data-comment="FlexHorizontal" {...props} className={className}>
      {props.children}
    </div>
  );
};
FlexHorizontal.displayName = "FlexHorizontal";

/********
 *
 * Grid System
 *
 ********/
interface MarginedProps extends PrimitiveProps {
  margin?: number | string;
}

/**
 * Lays out the children horizontally with
 * - ThisComponent: gets the overall Height (by max) of the children
 * - Children: get the Width : equally distributed from the parent Width
 * - Children: get the Height : sized by content
 * - ThisComponent: Puts a horizontal margin between each item
 */
export const ContentHorizontalMargined = (props: MarginedProps) => {
  const {margin} = props;
  const otherProps = _objectWithoutProperties(props, ['margin', 'children']);

  const spacing = (margin == null ? defaultValues.spacing : margin);
  const className = typestyle.classes(props.className, typestyle.style(csstips.horizontallySpaced(spacing)));

  return (
    <ContentHorizontal {...otherProps} className={className} data-comment="ContentHorizontalMargined">
      {
        props.children
      }
    </ContentHorizontal>
  );
}
ContentHorizontalMargined.displayName = "ContentHorizontalMargined";

/**
 * Lays out the children horizontally with
 * - Parent: gets to chose the Width
 * - ThisComponent: gets the overall Height (by max) of the children
 * - Children: get the Width : equally distributed from the parent Width
 * - Children: get the Height : sized by content
 * - ThisComponent: Puts a horizontal margin between each item
 */
export const FlexHorizontalMargined = (props: MarginedProps) => {
  const {margin} = props;
  const otherProps = _objectWithoutProperties(props, ['margin', 'children']);

  const spacing = (margin == null ? defaultValues.spacing : margin);
  const className = typestyle.classes(props.className, typestyle.style(csstips.horizontallySpaced(spacing)));

  return (
    <FlexHorizontal {...otherProps} className={className} data-comment="FlexHorizontalMargined">
      {
        props.children
      }
    </FlexHorizontal>
  );
}
FlexHorizontalMargined.displayName = "FlexHorizontalMargined";

export const FlexVerticalMargined = (props: MarginedProps) => {
  const {margin} = props;
  const otherProps = _objectWithoutProperties(props, ['margin', 'children']);

  const spacing = (margin == null ? defaultValues.spacing : margin);
  const className = typestyle.classes(props.className, typestyle.style(csstips.verticallySpaced(spacing)));

  return (
    <FlexVertical {...otherProps} className={className} data-comment="FlexVerticalMargined">
      {
        props.children
      }
    </FlexVertical>
  );
}
FlexHorizontalMargined.displayName = "FlexVerticalMargined";

/**
 * Lays out the children vertically with
 * - Parent: gets to chose the Width
 * - ThisComponent: gets the Height : (by sum) of the children
 * - Children: get the Width : parent
 * - Children: get the Height : sized by content
 * - ThisComponent: Puts a vertical margin between each item
 */
export const ContentVerticalMargined = (props: MarginedProps) => {
  const {margin} = props;
  const otherProps = _objectWithoutProperties(props, ['margin', 'children']);

  const spacing = (margin == null ? defaultValues.spacing : margin);
  const className = typestyle.classes(props.className, typestyle.style(csstips.verticallySpaced(spacing)));

  return (
    <ContentVertical {...otherProps} className={className} data-comment="ContentVerticalMargined">
      {
        props.children
      }
    </ContentVertical>
  );
}
ContentVerticalMargined.displayName = "ContentVerticalMargined";

/**
 * Lays out the children vertically with
 * - Parent: gets to chose the overall Width
 * - ThisComponent: gets the Height : (by sum) of the children
 * - Children: get the Width : sized by content
 * - Children: get the Height : sized by content
 * - ThisComponent: Puts a margin between each item.
 * - ThisComponent: Puts a negative margin on itself to offset the margins of the children (prevents them from leaking out)
 */
export const GridMargined = (props: MarginedProps) => {
  const {margin} = props;
  const otherProps = _objectWithoutProperties(props, ['margin', 'children']);
  const spacing = (margin == null ? defaultValues.spacing : margin) + 'px';

  const className = typestyle.style(csstips.wrap, { marginTop: '-' + spacing, marginLeft: '-' + spacing }, props.style as any || {});
  const children = React.Children.toArray(props.children).filter(c => !!c);
  return (
    <ContentHorizontal {...otherProps} className={className}>
      {
        children.map((child, i) => <Content key={(child as any).key || i} style={{ marginLeft: spacing, marginTop: spacing }}>{child}</Content>)
      }
    </ContentHorizontal>
  );
}
GridMargined.displayName = "GridMargined";

/**
 * Responsive Containers
 */
interface ResponsiveMarginedProps extends PrimitiveProps {
  margin?: number;
  breakpoint?: number;
}
/**
 * Lays out the children horizontally till breakpoint, then horizontally
 * - ThisComponent: gets the overall Height (by max) of the children
 * - Children: get the Width : equally distributed from the parent Width
 * - Children: get the Height : sized by content
 * - ThisComponent: Puts a horizontal margin between each item
 */
export const ResponsiveContentMargined = (props: ResponsiveMarginedProps) => {
  const {margin, breakpoint} = props;
  const otherProps = _objectWithoutProperties(props, ['margin', 'children', 'breakpoint']);

  const spacing = (margin == null ? defaultValues.spacing : margin);
  const breakpointPx = (breakpoint || defaultValues.breakpoints.phone) + 'px';

  const className = typestyle.classes(
    props.className,
    typestyle.style(
      csstips.content,

      /** Lower than breakpoint: Vertical Margined */
      csstips.vertical,
      csstips.verticallySpaced(spacing),

      /** Bigger than breakpoint: Horizontal Margined */
      {
        [`@media screen and (min-width: ${breakpointPx})`]: typestyle.extend(
          /** Clear stuff from the previous layout `&&` to increase specifity */
          {
            $nest: {
              '&&>*': {
                marginBottom: '0px !important',
              }
            }
          },
          csstips.horizontal,
          csstips.horizontallySpaced(spacing),
        )
      },
    )
  );

  return (
    <div {...otherProps} className={className} data-comment="ResponsiveContentMargined">
      {
        props.children
      }
    </div>
  );
}
ResponsiveContentMargined.displayName = "ResponsiveContentMargined";