import { FC } from "react"

interface IconProps {
  title?: string
  spanClass?: string
  svgClass?: string
  onClick?: () => void
}

// SVGs from https://iconer.app
export const ReceiptIcon: FC<IconProps> = props => (
  <span title={props.title} onClick={props.onClick} className={props.spanClass}>
    <svg
      className={props.svgClass}
      width="46"
      height="46"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 15.75V2.25L9 3l1.5-.75 1.497.75 1.518-.75L15 3l1.49-.75 1.497.75 1.513-.75L21 3l1.5-.75v10.5"></path>
      <path d="M22.5 12.75V18a3.75 3.75 0 0 1-3.75 3.75v0A3.75 3.75 0 0 1 15 18v-2.25H2.25a.743.743 0 0 0-.75.75c0 3 .316 5.25 3.75 5.25h13.5"></path>
      <path d="M10.5 6.75h9"></path>
      <path d="M13.5 10.5h6"></path>
    </svg>
  </span>
)
export const ReceiptFilledIcon: FC<IconProps> = props => (
  <span title={props.title} onClick={props.onClick} className={props.spanClass}>
    <svg
      className={props.svgClass}
      width="46"
      height="46"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path d="m21 2.25-1.5-.75-1.5.75-1.5-.75-1.5.75-1.5-.75-1.5.75-1.5-.75-1.5.75-2.25-.75v12.002h10.5v6.373c0 1.45 1.55 2.625 3 2.625h.563c1.45 0 2.437-1.175 2.437-2.625V1.5L21 2.25Zm-8.227 9-.023-1.5h7.477l.023 1.5h-7.477Zm-3-3.75L9.75 6h10.477l.023 1.5H9.773Z"></path>
      <path d="M15.75 19.875V15h-15v1.5c0 2.37.27 3.357.678 4.108.69 1.273 1.94 1.892 3.822 1.892h12s-1.5-.938-1.5-2.625Z"></path>
    </svg>
  </span>
)
export const RightArrowIcon: FC<IconProps> = props => (
  <span title={props.title} onClick={props.onClick} className={props.spanClass}>
    <svg
      className={props.svgClass}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <path d="M21 12l-18 12v-24z" />
    </svg>
  </span>
)
export const DownArrowIcon: FC<IconProps> = props => (
  <span title={props.title} onClick={props.onClick} className={props.spanClass}>
    <svg
      className={props.svgClass}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <path d="M12 21l-12-18h24z" />
    </svg>
  </span>
)
export const FileIcon: FC<IconProps> = props => (
  <span title={props.title} onClick={props.onClick} className={props.spanClass}>
    <svg
      className={props.svgClass}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <path d="M14.568.075c2.202 1.174 5.938 4.883 7.432 6.881-1.286-.9-4.044-1.657-6.091-1.179.222-1.468-.185-4.534-1.341-5.702zm-.824 7.925s1.522-8-3.335-8h-8.409v24h20v-13c0-3.419-5.247-3.745-8.256-3z" />
    </svg>
  </span>
)
export const FolderIcon: FC<IconProps> = props => (
  <span title={props.title} onClick={props.onClick} className={props.spanClass}>
    <svg
      className={props.svgClass}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <path d="M24 22h-24v-14h7.262c1.559 0 2.411-.708 5.07-3h11.668v17zm-16.738-16c.64 0 1.11-.271 2.389-1.34l-2.651-2.66h-7v4h7.262z" />
    </svg>
  </span>
)
export const FolderOpenIcon: FC<IconProps> = props => (
  <span title={props.title} onClick={props.onClick} className={props.spanClass}>
    <svg
      className={props.svgClass}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <path d="M2 9l-1-7h5.694c1.265 1.583 1.327 2 3.306 2h13l-1 5h-4.193l-3.9-3-1.464 1.903 1.428 1.097h-1.971l-3.9-3-2.307 3h-3.693zm-2 2l2 11h20l2-11h-24z" />
    </svg>
  </span>
)
export const GithubIcon: FC<IconProps> = props => (
  <span title={props.title} onClick={props.onClick} className={props.spanClass}>
    <svg
      className={props.svgClass}
      enableBackground="new 0 0 32 32"
      width="46"
      height="46"
      id="Layer_1"
      version="1.0"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg">
      <path
        clipRule="evenodd"
        d="M16.003,0C7.17,0,0.008,7.162,0.008,15.997  c0,7.067,4.582,13.063,10.94,15.179c0.8,0.146,1.052-0.328,1.052-0.752c0-0.38,0.008-1.442,0-2.777  c-4.449,0.967-5.371-2.107-5.371-2.107c-0.727-1.848-1.775-2.34-1.775-2.34c-1.452-0.992,0.109-0.973,0.109-0.973  c1.605,0.113,2.451,1.649,2.451,1.649c1.427,2.443,3.743,1.737,4.654,1.329c0.146-1.034,0.56-1.739,1.017-2.139  c-3.552-0.404-7.286-1.776-7.286-7.906c0-1.747,0.623-3.174,1.646-4.292C7.28,10.464,6.73,8.837,7.602,6.634  c0,0,1.343-0.43,4.398,1.641c1.276-0.355,2.645-0.532,4.005-0.538c1.359,0.006,2.727,0.183,4.005,0.538  c3.055-2.07,4.396-1.641,4.396-1.641c0.872,2.203,0.323,3.83,0.159,4.234c1.023,1.118,1.644,2.545,1.644,4.292  c0,6.146-3.74,7.498-7.304,7.893C19.479,23.548,20,24.508,20,26c0,2,0,3.902,0,4.428c0,0.428,0.258,0.901,1.07,0.746  C27.422,29.055,32,23.062,32,15.997C32,7.162,24.838,0,16.003,0z"
        fillRule="evenodd"
      />
    </svg>
  </span>
)
export const SunIcon: FC<IconProps> = props => (
  <span title={props.title} onClick={props.onClick} className={props.spanClass}>
    <svg
      className={props.svgClass}
      width="46"
      height="46"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        clipRule="evenodd"
      />
    </svg>
  </span>
)
export const MoonIcon: FC<IconProps> = props => (
  <span title={props.title} onClick={props.onClick} className={props.spanClass}>
    <svg
      className={props.svgClass}
      xmlns="http://www.w3.org/2000/svg"
      width="46"
      height="46"
      viewBox="0 0 20 20"
      fill="currentColor">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  </span>
)
export const ExitIcon: FC<IconProps> = props => (
  <span title={props.title} onClick={props.onClick} className={props.spanClass}>
    <svg
      className={props.svgClass}
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd">
      <path d="M11 21h8v-2l1-1v4h-9v2l-10-3v-18l10-3v2h9v5l-1-1v-3h-8v18zm10.053-9l-3.293-3.293.707-.707 4.5 4.5-4.5 4.5-.707-.707 3.293-3.293h-9.053v-1h9.053z" />
    </svg>
  </span>
)
export const MenuIcon: FC<IconProps> = props => (
  <span title={props.title} onClick={props.onClick} className={props.spanClass}>
    <svg
      className={props.svgClass}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <path d="M4 22h-4v-4h4v4zm0-12h-4v4h4v-4zm0-8h-4v4h4v-4zm3 0v4h17v-4h-17zm0 12h17v-4h-17v4zm0 8h17v-4h-17v4z" />
    </svg>
  </span>
)
export const CaretUpIcon: FC<IconProps> = props => (
  <span title={props.title} onClick={props.onClick} className={props.spanClass}>
    <svg
      className={props.svgClass}
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path d="m16.843 13.789c.108.141.157.3.157.456 0 .389-.306.755-.749.755h-8.501c-.445 0-.75-.367-.75-.755 0-.157.05-.316.159-.457 1.203-1.554 3.252-4.199 4.258-5.498.142-.184.36-.29.592-.29.23 0 .449.107.591.291 1.002 1.299 3.044 3.945 4.243 5.498z" />
    </svg>
  </span>
)
export const CaretLeftIcon: FC<IconProps> = props => (
  <span title={props.title} onClick={props.onClick} className={props.spanClass}>
    <svg
      className={props.svgClass}
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path d="m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591 1.299-1.002 3.945-3.044 5.498-4.243z" />
    </svg>
  </span>
)
export const CaretRightIcon: FC<IconProps> = props => (
  <span title={props.title} onClick={props.onClick} className={props.spanClass}>
    <svg
      className={props.svgClass}
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z" />
    </svg>
  </span>
)
export const CaretDownIcon: FC<IconProps> = props => (
  <span title={props.title} onClick={props.onClick} className={props.spanClass}>
    <svg
      className={props.svgClass}
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z" />
    </svg>
  </span>
)
export const RotateIcon: FC<IconProps> = props => (
  <span title={props.title} onClick={props.onClick} className={props.spanClass}>
    <svg
      className={props.svgClass}
      width="46"
      height="46"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M19.734 16.06a8.923 8.923 0 0 1-3.915 3.978 8.706 8.706 0 0 1-5.471.832 8.795 8.795 0 0 1-4.887-2.64 9.067 9.067 0 0 1-2.388-5.079 9.136 9.136 0 0 1 1.044-5.53 8.904 8.904 0 0 1 4.069-3.815 8.7 8.7 0 0 1 5.5-.608c1.85.401 3.366 1.313 4.62 2.755.151.16.735.806 1.22 1.781"></path>
      <path d="m15.069 7.813 5.04.907L21 3.59"></path>
    </svg>
  </span>
)
export const CogIcon: FC<IconProps> = props => (
  <span title={props.title} onClick={props.onClick} className={props.spanClass}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={props.svgClass}
      viewBox="0 0 20 20"
      fill="currentColor">
      <path
        fillRule="evenodd"
        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  </span>
)
