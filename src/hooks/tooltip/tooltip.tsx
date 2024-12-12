import React, { forwardRef } from 'react';
import { Whisper, Popover, WhisperProps } from 'rsuite';

// Define the props for DefaultPopover
type DefaultPopoverProps = {
  content?: React.ReactNode;
  className?: string;
};

// Define the DefaultPopover component
const DefaultPopover = forwardRef<HTMLDivElement, DefaultPopoverProps>(
  ({ content, className, ...props }, ref) => {
    return (
      <Popover ref={ref} {...props} className={className} arrow={false}>
        <p>{content}</p>
      </Popover>
    );
  }
);

// Set a display name for the DefaultPopover component
DefaultPopover.displayName = 'DefaultPopover';

// Define the props for AppTooltip
type AppTooltipProps = {
  placement?: WhisperProps['placement']; // Use the type from WhisperProps
  data?: React.ReactNode;
  className?: string;
  name?: string;
  tooltipClass?: string;
};

// Define the AppTooltip component
const AppTooltip: React.FC<AppTooltipProps> = ({
  placement,
  data,
  className,
  name,
  tooltipClass
}) => (
  <Whisper
    trigger="click"
    placement={placement}
    controlId={`control-id-${placement}`}
    speaker={<DefaultPopover content={data} className={tooltipClass} />}
  >
    <div className={className}>{name}</div>
  </Whisper>
);

// Set a display name for the AppTooltip component
AppTooltip.displayName = 'AppTooltip';

export default AppTooltip;
