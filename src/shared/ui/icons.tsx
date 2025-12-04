interface IconProps {
  size?: number;
  className?: string;
  inactive?: boolean;
}

export function IconBackpack({
  className,
  size = 102,
  inactive = false,
}: IconProps) {
  return inactive ? (
    <svg
      width={size}
      height={size}
      viewBox='0 0 102 102'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g clipPath='url(#clip0_2155_9518)'>
        <path
          opacity='0.35'
          d='M64.0084 93.608L37.2951 93.3891C21.267 93.2578 8.26064 80.0364 8.39199 64.0084L8.61091 37.295C8.74226 21.267 21.9636 8.26061 37.9916 8.39196L64.705 8.61088C80.733 8.74223 93.7394 21.9635 93.6081 37.9916L93.3891 64.705C93.2578 80.733 80.0365 93.7394 64.0084 93.608Z'
          fill='#B0AFB8'
        />
        <path
          opacity='0.35'
          d='M64.0084 93.608L37.2951 93.3891C21.267 93.2578 8.26064 80.0364 8.39199 64.0084L8.61091 37.295C8.74226 21.267 21.9636 8.26061 37.9916 8.39196L64.705 8.61088C80.733 8.74223 93.7394 21.9635 93.6081 37.9916L93.3891 64.705C93.2578 80.733 80.0365 93.7394 64.0084 93.608Z'
          fill='#98979D'
          stroke='#B0AFB8'
          strokeWidth='17'
          strokeMiterlimit='10'
        />
        <g clipPath='url(#clip1_2155_9518)'>
          <path
            d='M58.3584 73.8272L43.0256 73.7016C41.7634 73.6861 40.5414 73.2557 39.5481 72.4769C38.5548 71.698 37.8453 70.6139 37.5293 69.3918C38.1035 66.2949 39.7501 63.4992 42.1801 61.4952C44.61 59.4912 47.6681 58.407 50.8177 58.4328C53.9673 58.4586 57.0072 59.5928 59.4039 61.6363C61.8007 63.6799 63.4013 66.5022 63.9247 69.6081C63.5886 70.8248 62.8615 71.8972 61.8556 72.6597C60.8496 73.4222 59.6207 73.8324 58.3584 73.8272ZM33.4897 67.8732L33.6087 53.353C31.8956 54.0841 30.4327 55.2984 29.3987 56.8477C28.3648 58.3969 27.8048 60.2138 27.787 62.0763L27.7713 63.9929C27.7564 66.174 28.486 68.2949 29.8395 70.0052C31.193 71.7156 33.0894 72.9131 35.2155 73.3999C34.0788 71.7823 33.4755 69.8502 33.4897 67.8732ZM68.1076 53.6358L67.9886 68.1559C67.9704 70.1329 67.3355 72.0549 66.1725 73.6536C68.3062 73.2017 70.222 72.0354 71.6034 70.3475C72.9847 68.6595 73.7489 66.5509 73.7698 64.3699L73.7855 62.4533C73.7983 60.5908 73.2681 58.7649 72.2597 57.1989C71.2513 55.6329 69.8085 54.3948 68.1076 53.6358ZM64.3124 48.9585L64.2126 61.1404C62.6166 59.1195 60.5874 57.4825 58.2745 56.3502C55.9617 55.2178 53.4242 54.6191 50.8491 54.598C48.274 54.5769 45.7271 55.134 43.3959 56.2282C41.0648 57.3225 39.0091 58.926 37.3802 60.9205L37.48 48.7386C37.4991 46.5784 38.0401 44.4548 39.0569 42.5488C40.0737 40.6428 41.5363 39.0109 43.3199 37.7921L43.3398 35.3695C43.3564 33.3363 44.1801 31.3929 45.6296 29.9669C47.0791 28.541 49.0357 27.7493 51.069 27.7659C53.1023 27.7826 55.0456 28.6063 56.4716 30.0558C57.8975 31.5053 58.6892 33.4619 58.6726 35.4952L58.6527 37.9178C60.4161 39.1656 61.8517 40.8213 62.8372 42.7437C63.8227 44.6661 64.3288 46.7983 64.3124 48.9585ZM47.1682 35.9759C49.6743 35.2425 52.341 35.2644 54.8347 36.0387L54.8394 35.4638C54.8477 34.4471 54.4518 33.4688 53.7389 32.7441C53.0259 32.0193 52.0542 31.6075 51.0376 31.5991C50.021 31.5908 49.0427 31.9867 48.3179 32.6996C47.5931 33.4126 47.1813 34.3843 47.173 35.4009L47.1682 35.9759ZM56.6617 46.9791C56.6659 46.4708 56.468 45.9816 56.1115 45.6192C55.755 45.2569 55.2692 45.0509 54.7608 45.0468L47.0944 44.9839C46.5861 44.9798 46.097 45.1777 45.7346 45.5342C45.3722 45.8907 45.1663 46.3765 45.1621 46.8848C45.158 47.3932 45.3559 47.8823 45.7124 48.2447C46.0689 48.6071 46.5547 48.813 47.063 48.8171L54.7294 48.88C55.2377 48.8841 55.7269 48.6862 56.0893 48.3297C56.4516 47.9732 56.6576 47.4874 56.6617 46.9791Z'
            fill='#B0AFB8'
          />
        </g>
      </g>
      <defs>
        <clipPath id='clip0_2155_9518'>
          <rect width='102' height='102' fill='white' />
        </clipPath>
        <clipPath id='clip1_2155_9518'>
          <rect
            width='46'
            height='46'
            fill='white'
            transform='translate(28.0698 27.5775) rotate(0.469534)'
          />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg
      width={size}
      height={size}
      viewBox='0 0 102 102'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g clipPath='url(#clip0_2155_9517)'>
        <path
          opacity='0.35'
          d='M64.3571 93.5H37.6429C21.6143 93.5 8.5 80.3857 8.5 64.3571V37.6429C8.5 21.6143 21.6143 8.5 37.6429 8.5H64.3571C80.3857 8.5 93.5 21.6143 93.5 37.6429V64.3571C93.5 80.3857 80.3857 93.5 64.3571 93.5Z'
          fill='white'
        />
        <path
          opacity='0.35'
          d='M64.3571 93.5H37.6429C21.6143 93.5 8.5 80.3857 8.5 64.3571V37.6429C8.5 21.6143 21.6143 8.5 37.6429 8.5H64.3571C80.3857 8.5 93.5 21.6143 93.5 37.6429V64.3571C93.5 80.3857 80.3857 93.5 64.3571 93.5Z'
          fill='#D3D2E0'
          stroke='white'
          strokeWidth='17'
          strokeMiterlimit='10'
        />
        <g clipPath='url(#clip1_2155_9517)'>
          <path
            d='M58.5452 73.7661H43.2119C41.9496 73.761 40.7241 73.3407 39.7244 72.57C38.7247 71.7993 38.0065 70.721 37.6804 69.5016C38.2293 66.4001 39.8529 63.5909 42.2663 61.5671C44.6798 59.5433 47.7288 58.434 50.8785 58.434C54.0282 58.434 57.0773 59.5433 59.4908 61.5671C61.9042 63.5909 63.5278 66.4001 64.0767 69.5016C63.7506 70.721 63.0323 71.7993 62.0327 72.57C61.033 73.3407 59.8075 73.761 58.5452 73.7661ZM33.6285 68.0161V53.4955C31.9215 54.2405 30.4685 55.4668 29.4473 57.0245C28.4261 58.5821 27.881 60.4036 27.8785 62.2661L27.8785 64.1828C27.8815 66.3639 28.6284 68.4788 29.9959 70.178C31.3634 71.8772 33.2695 73.0591 35.3995 73.5285C34.2496 71.9203 33.6305 69.9932 33.6285 68.0161ZM68.1285 53.4955V68.0161C68.1266 69.9932 67.5075 71.9203 66.3575 73.5285C68.4876 73.0591 70.3937 71.8772 71.7612 70.178C73.1286 68.4788 73.8756 66.3639 73.8785 64.1828V62.2661C73.8761 60.4036 73.3309 58.5821 72.3098 57.0245C71.2886 55.4668 69.8356 54.2405 68.1285 53.4955ZM64.2952 48.8495V61.0318C62.6827 59.024 60.6401 57.4037 58.3181 56.2904C55.996 55.177 53.4537 54.5991 50.8785 54.5991C48.3034 54.5991 45.7611 55.177 43.439 56.2904C41.1169 57.4037 39.0744 59.024 37.4619 61.0318V48.8495C37.4632 46.6892 37.9868 44.5613 38.988 42.647C39.9892 40.7327 41.4383 39.0889 43.2119 37.8555V35.4328C43.2119 33.3995 44.0196 31.4494 45.4574 30.0117C46.8952 28.5739 48.8452 27.7661 50.8785 27.7661C52.9119 27.7661 54.8619 28.5739 56.2997 30.0117C57.7375 31.4494 58.5452 33.3995 58.5452 35.4328V37.8555C60.3188 39.0889 61.7679 40.7327 62.7691 42.647C63.7703 44.5613 64.2939 46.6892 64.2952 48.8495ZM47.0452 36.0078C49.5452 35.2539 52.2119 35.2539 54.7119 36.0078V35.4328C54.7119 34.4161 54.308 33.4411 53.5891 32.7222C52.8702 32.0033 51.8952 31.5995 50.8785 31.5995C49.8619 31.5995 48.8869 32.0033 48.168 32.7222C47.4491 33.4411 47.0452 34.4161 47.0452 35.4328V36.0078ZM56.6285 46.9328C56.6285 46.4245 56.4266 45.937 56.0672 45.5775C55.7077 45.2181 55.2202 45.0161 54.7119 45.0161H47.0452C46.5369 45.0161 46.0494 45.2181 45.6899 45.5775C45.3305 45.937 45.1285 46.4245 45.1285 46.9328C45.1285 47.4411 45.3305 47.9287 45.6899 48.2881C46.0494 48.6475 46.5369 48.8495 47.0452 48.8495H54.7119C55.2202 48.8495 55.7077 48.6475 56.0672 48.2881C56.4266 47.9287 56.6285 47.4411 56.6285 46.9328Z'
            fill='white'
          />
        </g>
      </g>
      <defs>
        <clipPath id='clip0_2155_9517'>
          <rect width='102' height='102' fill='white' />
        </clipPath>
        <clipPath id='clip1_2155_9517'>
          <rect
            width='46'
            height='46'
            fill='white'
            transform='translate(27.8785 27.7661)'
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function IconPause({
  className,
  size = 102,
  inactive = false,
}: IconProps) {
  return inactive ? (
    <svg
      width={size}
      height={size}
      viewBox='0 0 102 102'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g clipPath='url(#clip0_2155_9523)'>
        <path
          opacity='0.35'
          d='M64.0084 93.608L37.295 93.3891C21.267 93.2578 8.26061 80.0364 8.39196 64.0084L8.61088 37.295C8.74223 21.267 21.9635 8.26061 37.9916 8.39196L64.705 8.61088C80.733 8.74223 93.7394 21.9635 93.608 37.9916L93.3891 64.705C93.2578 80.733 80.0364 93.7394 64.0084 93.608Z'
          fill='#B0AFB8'
        />
        <path
          opacity='0.35'
          d='M64.0084 93.608L37.295 93.3891C21.267 93.2578 8.26061 80.0364 8.39196 64.0084L8.61088 37.295C8.74223 21.267 21.9635 8.26061 37.9916 8.39196L64.705 8.61088C80.733 8.74223 93.7394 21.9635 93.608 37.9916L93.3891 64.705C93.2578 80.733 80.0364 93.7394 64.0084 93.608Z'
          fill='#98979D'
          stroke='#B0AFB8'
          strokeWidth='17'
          strokeMiterlimit='10'
        />
        <path
          d='M55.4236 65.8639L55.6704 35.7428C55.6907 33.2671 57.7365 31.2207 60.1712 31.2406L60.577 31.2439C63.0117 31.2639 65.0237 33.3436 65.0034 35.8193L64.7566 65.9404C64.7363 68.4161 62.6905 70.4626 60.2558 70.4426L59.85 70.4393C57.4153 70.4194 55.4033 68.3396 55.4236 65.8639Z'
          fill='#B0AFB8'
        />
        <path
          d='M36.7575 65.711L37.0044 35.5899C37.0247 33.1142 39.0705 31.0677 41.5052 31.0877L41.911 31.091C44.3457 31.1109 46.3577 33.1907 46.3374 35.6664L46.0905 65.7875C46.0703 68.2632 44.0244 70.3096 41.5897 70.2897L41.1839 70.2864C38.3435 70.2631 36.7372 68.1867 36.7575 65.711Z'
          fill='#B0AFB8'
        />
      </g>
      <defs>
        <clipPath id='clip0_2155_9523'>
          <rect width={size} height={size} fill='white' />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg
      width={size}
      height={size}
      viewBox='0 0 102 102'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g clipPath='url(#clip0_2155_9521)'>
        <path
          opacity='0.35'
          d='M64.3571 93.5H37.6429C21.6143 93.5 8.5 80.3857 8.5 64.3571V37.6429C8.5 21.6143 21.6143 8.5 37.6429 8.5H64.3571C80.3857 8.5 93.5 21.6143 93.5 37.6429V64.3571C93.5 80.3857 80.3857 93.5 64.3571 93.5Z'
          fill='white'
        />
        <path
          opacity='0.35'
          d='M64.3571 93.5H37.6429C21.6143 93.5 8.5 80.3857 8.5 64.3571V37.6429C8.5 21.6143 21.6143 8.5 37.6429 8.5H64.3571C80.3857 8.5 93.5 21.6143 93.5 37.6429V64.3571C93.5 80.3857 80.3857 93.5 64.3571 93.5Z'
          fill='#D3D2E0'
          stroke='white'
          strokeWidth='17'
          strokeMiterlimit='10'
        />
        <path
          d='M55.5452 65.8272V35.7051C55.5452 33.2293 57.5742 31.1661 60.009 31.1661H60.4148C62.8496 31.1661 64.8786 33.2293 64.8786 35.7051V65.8272C64.8786 68.303 62.8496 70.3661 60.4148 70.3661H60.009C57.5742 70.3661 55.5452 68.303 55.5452 65.8272Z'
          fill='white'
        />
        <path
          d='M36.8786 65.8272V35.7051C36.8786 33.2293 38.9076 31.1661 41.3423 31.1661H41.7481C44.1829 31.1661 46.2119 33.2293 46.2119 35.7051V65.8272C46.2119 68.303 44.1829 70.3661 41.7481 70.3661H41.3423C38.5018 70.3661 36.8786 68.303 36.8786 65.8272Z'
          fill='white'
        />
      </g>
      <defs>
        <clipPath id='clip0_2155_9521'>
          <rect width={size} height={size} fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

export function IconClose({
  className,
  size = 102,
  inactive = false,
}: IconProps) {
  return inactive ? (
    <svg
      width={size}
      height={size}
      viewBox='0 0 102 102'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g clipPath='url(#clip0_2155_9520)'>
        <path
          opacity='0.35'
          d='M64.0084 93.608L37.2951 93.3891C21.267 93.2578 8.26064 80.0364 8.39199 64.0084L8.61091 37.295C8.74226 21.267 21.9636 8.26061 37.9916 8.39196L64.705 8.61088C80.733 8.74223 93.7394 21.9635 93.6081 37.9916L93.3891 64.705C93.2578 80.733 80.0365 93.7394 64.0084 93.608Z'
          fill='#B0AFB8'
        />
        <path
          opacity='0.35'
          d='M64.0084 93.608L37.2951 93.3891C21.267 93.2578 8.26064 80.0364 8.39199 64.0084L8.61091 37.295C8.74226 21.267 21.9636 8.26061 37.9916 8.39196L64.705 8.61088C80.733 8.74223 93.7394 21.9635 93.6081 37.9916L93.3891 64.705C93.2578 80.733 80.0365 93.7394 64.0084 93.608Z'
          fill='#98979D'
          stroke='#B0AFB8'
          strokeWidth='17'
          strokeMiterlimit='10'
        />
        <path
          d='M62.8214 33.5938C64.3272 32.1126 66.8087 32.1329 68.29 33.6387C69.7713 35.1445 69.751 37.6259 68.2452 39.1072L38.9396 67.9364C37.4338 69.4177 34.9523 69.3974 33.471 67.8916C31.9897 66.3858 32.0101 63.9043 33.5158 62.423L62.8214 33.5938Z'
          fill='#B0AFB8'
          stroke='#B0AFB8'
          strokeWidth='0.778378'
        />
        <path
          d='M33.752 33.3664C35.2582 31.8707 37.743 31.8911 39.2245 33.4112L68.0514 62.9893C69.5309 64.5073 69.5102 67.0091 68.0062 68.5027L67.9787 68.5299L67.9463 68.5511C67.193 69.0491 66.2163 69.2811 65.2635 69.2733C64.3107 69.2655 63.3379 69.0175 62.5929 68.5072L62.5609 68.4855L62.5338 68.4579L33.7068 38.8789C32.2277 37.3609 32.2482 34.86 33.752 33.3664Z'
          fill='#B0AFB8'
          stroke='#B0AFB8'
          strokeWidth='0.778378'
        />
      </g>
      <defs>
        <clipPath id='clip0_2155_9520'>
          <rect width={size} height={size} fill='white' />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg
      width={size}
      height={size}
      viewBox='0 0 102 102'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g clipPath='url(#clip0_2155_9519)'>
        <path
          opacity='0.35'
          d='M64.3571 93.5H37.6429C21.6143 93.5 8.5 80.3857 8.5 64.3571V37.6429C8.5 21.6143 21.6143 8.5 37.6429 8.5H64.3571C80.3857 8.5 93.5 21.6143 93.5 37.6429V64.3571C93.5 80.3857 80.3857 93.5 64.3571 93.5Z'
          fill='white'
        />
        <path
          opacity='0.35'
          d='M64.3571 93.5H37.6429C21.6143 93.5 8.5 80.3857 8.5 64.3571V37.6429C8.5 21.6143 21.6143 8.5 37.6429 8.5H64.3571C80.3857 8.5 93.5 21.6143 93.5 37.6429V64.3571C93.5 80.3857 80.3857 93.5 64.3571 93.5Z'
          fill='#D3D2E0'
          stroke='white'
          strokeWidth='17'
          strokeMiterlimit='10'
        />
        <path
          d='M62.6784 33.4976C64.172 32.004 66.6535 32.004 68.1471 33.4976C69.6407 34.9912 69.6407 37.4727 68.1471 38.9663L39.0788 68.0347C37.5852 69.5283 35.1036 69.5283 33.61 68.0347C32.1164 66.5411 32.1164 64.0596 33.61 62.5659L62.6784 33.4976Z'
          fill='white'
          stroke='white'
          strokeWidth='0.778378'
        />
        <path
          d='M33.6081 33.5083C35.102 32.0004 37.5868 32.0004 39.0807 33.5083L68.1491 62.8492C69.6409 64.355 69.6408 66.8569 68.1491 68.3628L68.1217 68.3902L68.0895 68.4117C67.3403 68.9158 66.3656 69.1558 65.4128 69.1558C64.4599 69.1558 63.4852 68.9158 62.736 68.4117L62.7038 68.3902L62.6764 68.3628L33.6081 39.021C32.1165 37.5152 32.1166 35.0142 33.6081 33.5083Z'
          fill='white'
          stroke='white'
          strokeWidth='0.778378'
        />
      </g>
      <defs>
        <clipPath id='clip0_2155_9519'>
          <rect width={size} height={size} fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

export function IconCaution({ size = 42, className }: IconProps) {
  const width = size;
  const height = (size / 40) * 37;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 40 37'
      fill='none'
      className={className}
    >
      <path
        opacity='0.4'
        d='M5.44552 36.3345C5.41952 36.3345 5.39552 36.3345 5.36752 36.3325C4.73752 36.3005 4.11952 36.1645 3.53152 35.9265C0.637516 34.7505 -0.758483 31.4445 0.415517 28.5525L15.0575 2.90049C15.5615 1.98849 16.3255 1.22449 17.2575 0.708493C19.9875 -0.803507 23.4395 0.190493 24.9495 2.91849L39.4955 28.3745C39.8195 29.1365 39.9575 29.7565 39.9915 30.3885C40.0695 31.9005 39.5535 33.3505 38.5415 34.4725C37.5295 35.5945 36.1395 36.2565 34.6295 36.3325L5.58952 36.3345H5.44552Z'
        fill='#FFF54F'
      />
      <path
        d='M19.999 24.7798C20.963 24.7798 21.749 25.5601 21.749 26.5181C21.7489 27.5039 20.9629 28.2896 19.999 28.2896C19.035 28.2896 18.249 27.5036 18.249 26.5396C18.2492 25.5697 19.0351 24.7798 19.999 24.7798ZM19.999 12.2915C20.963 12.2915 21.749 13.0775 21.749 14.0415V19.6978C21.7489 20.6636 20.9629 21.4478 19.999 21.4478C19.0351 21.4478 18.2492 20.6636 18.249 19.6978V14.0415C18.249 13.0775 19.035 12.2915 19.999 12.2915Z'
        fill='#FFF54F'
      />
    </svg>
  );
}

export function IconLightning({ size = 21, className }: IconProps) {
  return (
    <svg
      width={size}
      height={(size * 27) / 21}
      viewBox='0 0 21 27'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M1 13.9032L9.26446 1H19.1818L12.9835 9.87097H19.1818L1 26L6.78512 13.9032H1Z'
        fill='#FFF603'
        stroke='#FFF603'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function IconHeart({ size = 20, className }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 30 29'
      fill='none'
      className={className}
    >
      <path
        d='M4.9953 15.9564L12.3885 23.748C13.8081 25.2441 16.1919 25.2441 17.6115 23.748L25.0047 15.9564C27.6651 13.1526 27.6651 8.60678 25.0047 5.80302C22.3443 2.99925 18.0309 2.99925 15.3705 5.80302C15.1691 6.0153 14.8309 6.0153 14.6295 5.80302C11.9691 2.99925 7.6557 2.99925 4.9953 5.80302C2.3349 8.60679 2.3349 13.1526 4.9953 15.9564Z'
        fill='#FF4E59'
        stroke='#FF4E59'
        strokeWidth='1.8'
      />
    </svg>
  );
}

export function IconDown({ className }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      width='28'
      height='13'
      viewBox='0 0 28 13'
      fill='none'
    >
      <path
        d='M1.75 1.75L12.6333 11.0786C13.4198 11.7527 14.5802 11.7527 15.3667 11.0786L26.25 1.75'
        stroke='white'
        strokeWidth='2.625'
        strokeLinecap='round'
      />
    </svg>
  );
}

export function IconOptionPressedShadow({ className }: IconProps) {
  return (
    <svg
      preserveAspectRatio='none'
      viewBox='0 0 945 152'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g filter='url(#filter0_d_31_504)' data-figma-bg-blur-radius='4'>
        <path
          d='M20 76C20 49.4903 41.4903 28 68 28H925V124H68C41.4903 124 20 102.51 20 76Z'
          fill='black'
          fillOpacity='0.2'
          shapeRendering='crispEdges'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_31_504'
          x='-8'
          y='0'
          width='961'
          height='152'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='14' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.909804 0 0 0 0 0.729412 0 0 0 0 0.0823529 0 0 0 0.25 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_31_504'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_31_504'
            result='shape'
          />
        </filter>
        <clipPath id='bgblur_0_31_504_clip_path' transform='translate(8 0)'>
          <path d='M20 76C20 49.4903 41.4903 28 68 28H925V124H68C41.4903 124 20 102.51 20 76Z' />
        </clipPath>
        <clipPath
          id='bgblur_1_31_504_clip_path'
          transform='translate(-43.7891 -51)'
        >
          <path d='M88.3747 75.9998L68.7891 95.5854L49.2034 75.9998L68.7891 56.4142L88.3747 75.9998Z' />
        </clipPath>
        <clipPath
          id='bgblur_2_31_504_clip_path'
          transform='translate(-51.9197 -59)'
        >
          <rect
            y='0.355335'
            width='17.7926'
            height='17.7926'
            transform='matrix(0.703526 0.710669 -0.703526 0.710669 69.039 63.1028)'
          />
        </clipPath>
        <radialGradient
          id='paint0_radial_31_504'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(451.932 8.11759) rotate(90) scale(42.3478 326.631)'
        >
          <stop stopColor='#FF8A00' />
          <stop offset='1' stopColor='white' stopOpacity='0' />
        </radialGradient>
        <linearGradient
          id='paint1_linear_31_504'
          x1='20'
          y1='76'
          x2='925'
          y2='76'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#FFDB5A' />
          <stop offset='0.831731' stopColor='#FFDB5A' stopOpacity='0' />
        </linearGradient>
        <radialGradient
          id='paint2_radial_31_504'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(83.1611 60.6734) rotate(135) scale(13.1007 10.7187)'
        >
          <stop stopColor='#FF8A00' />
          <stop offset='1' stopColor='white' stopOpacity='0' />
        </radialGradient>
        <radialGradient
          id='paint3_radial_31_504'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(9.14631 -3.04877) rotate(90) scale(21.3414)'
        >
          <stop stopColor='#FAFF00' />
          <stop offset='0.568159' stopColor='white' stopOpacity='0' />
        </radialGradient>
        <radialGradient
          id='paint4_radial_31_504'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(8.73057 -3.78856) rotate(90) scale(8.06929 6.60215)'
        >
          <stop stopColor='#FF8A00' />
          <stop offset='1' stopColor='white' stopOpacity='0' />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function IconTrash2({ className, size }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 81 81'
      fill='none'
      className={className}
    >
      <path
        d='M10.125 20.25H16.875H70.875'
        stroke='white'
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M64.125 20.25V67.5C64.125 69.2902 63.4138 71.0071 62.148 72.273C60.8821 73.5388 59.1652 74.25 57.375 74.25H23.625C21.8348 74.25 20.1179 73.5388 18.852 72.273C17.5862 71.0071 16.875 69.2902 16.875 67.5V20.25M27 20.25V13.5C27 11.7098 27.7112 9.9929 28.977 8.72703C30.2429 7.46116 31.9598 6.75 33.75 6.75H47.25C49.0402 6.75 50.7571 7.46116 52.023 8.72703C53.2888 9.9929 54 11.7098 54 13.5V20.25'
        stroke='white'
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M33.75 37.125V57.375'
        stroke='white'
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M47.25 37.125V57.375'
        stroke='white'
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function IconBackpackCircle({ className }: IconProps) {
  return (
    <svg
      viewBox='0 0 146 146'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g transform='translate(0, -18.041)'>
        <rect
          opacity='0.35'
          x='11.1582'
          y='29.1992'
          width='123'
          height='123'
          rx='61.5'
          fill='white'
        />
        <rect
          opacity='0.22'
          x='11.1582'
          y='29.1992'
          width='123'
          height='123'
          rx='61.5'
          fill='#D3D2E0'
          stroke='white'
          strokeWidth='22.3165'
          strokeMiterlimit='10'
        />

        <g clipPath='url(#clip0_1387_5132)'>
          <path
            d='M85.1582 124.199H61.1582C59.1825 124.191 57.2643 123.533 55.6996 122.327C54.1349 121.121 53.0106 119.433 52.5002 117.524C53.3593 112.67 55.9006 108.273 59.6782 105.105C63.4557 101.937 68.2282 100.201 73.1582 100.201C78.0882 100.201 82.8607 101.937 86.6382 105.105C90.4158 108.273 92.9571 112.67 93.8162 117.524C93.3058 119.433 92.1815 121.121 90.6168 122.327C89.0521 123.533 87.1339 124.191 85.1582 124.199ZM46.1582 115.199V92.4712C43.4863 93.6373 41.2121 95.5568 39.6137 97.9949C38.0153 100.433 37.162 103.284 37.1582 106.199V109.199C37.1629 112.613 38.332 115.923 40.4723 118.583C42.6127 121.243 45.5963 123.093 48.9302 123.827C47.1303 121.31 46.1612 118.294 46.1582 115.199ZM100.158 92.4712V115.199C100.155 118.294 99.1861 121.31 97.3862 123.827C100.72 123.093 103.704 121.243 105.844 118.583C107.984 115.923 109.154 112.613 109.158 109.199V106.199C109.154 103.284 108.301 100.433 106.703 97.9949C105.104 95.5568 102.83 93.6373 100.158 92.4712ZM94.1582 85.1992V104.267C91.6343 101.125 88.4372 98.5884 84.8027 96.8458C81.1682 95.1032 77.1889 94.1986 73.1582 94.1986C69.1275 94.1986 65.1482 95.1032 61.5137 96.8458C57.8792 98.5884 54.6821 101.125 52.1582 104.267V85.1992C52.1603 81.8179 52.9798 78.4872 54.5469 75.491C56.114 72.4947 58.3822 69.9217 61.1582 67.9912V64.1992C61.1582 61.0166 62.4225 57.9644 64.6729 55.7139C66.9234 53.4635 69.9756 52.1992 73.1582 52.1992C76.3408 52.1992 79.393 53.4635 81.6435 55.7139C83.8939 57.9644 85.1582 61.0166 85.1582 64.1992V67.9912C87.9342 69.9217 90.2024 72.4947 91.7695 75.491C93.3366 78.4872 94.1561 81.8179 94.1582 85.1992ZM67.1582 65.0992C71.0712 63.9192 75.2452 63.9192 79.1582 65.0992V64.1992C79.1582 62.6079 78.5261 61.0818 77.4008 59.9566C76.2756 58.8314 74.7495 58.1992 73.1582 58.1992C71.5669 58.1992 70.0408 58.8314 68.9156 59.9566C67.7903 61.0818 67.1582 62.6079 67.1582 64.1992V65.0992ZM82.1582 82.1992C82.1582 81.4036 81.8421 80.6405 81.2795 80.0779C80.7169 79.5153 79.9539 79.1992 79.1582 79.1992H67.1582C66.3626 79.1992 65.5995 79.5153 65.0369 80.0779C64.4743 80.6405 64.1582 81.4036 64.1582 82.1992C64.1582 82.9949 64.4743 83.7579 65.0369 84.3205C65.5995 84.8831 66.3626 85.1992 67.1582 85.1992H79.1582C79.9539 85.1992 80.7169 84.8831 81.2795 84.3205C81.8421 83.7579 82.1582 82.9949 82.1582 82.1992Z'
            fill='white'
          />
        </g>
      </g>
      <defs>
        <clipPath id='clip0_1387_5132'>
          <rect
            width='72'
            height='72'
            fill='white'
            transform='translate(37.1582 52.1992)'
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function IconDiamond({ className }: IconProps) {
  return (
    <svg
      viewBox='0 0 43 42'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <rect
        x='21'
        y='1.41421'
        width='27.6985'
        height='27.6985'
        transform='rotate(45 21 1.41421)'
        stroke='white'
        strokeWidth='2'
      />
      <rect
        width='18.2926'
        height='18.2926'
        transform='matrix(0.703526 0.710669 -0.703526 0.710669 21 8.00018)'
        fill='white'
      />
    </svg>
  );
}

export function IconPotential({ size = 28, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 28 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M14 2.33334C12.1333 2.33334 10.6667 3.80001 10.6667 5.66668V7.00001C10.6667 7.64168 11.1917 8.16668 11.8333 8.16668H16.1667C16.8083 8.16668 17.3333 7.64168 17.3333 7.00001V5.66668C17.3333 3.80001 15.8667 2.33334 14 2.33334Z'
        fill='#B39CFF'
      />
      <path
        d='M18.6667 9.33334H9.33333C8.04167 9.33334 7 10.375 7 11.6667V18.6667C7 21.6117 9.38833 24.0833 12.3333 24.5V25.6667H10.5C9.85833 25.6667 9.33333 26.1917 9.33333 26.8333C9.33333 27.475 9.85833 28 10.5 28H17.5C18.1417 28 18.6667 27.475 18.6667 26.8333C18.6667 26.1917 18.1417 25.6667 17.5 25.6667H15.6667V24.5C18.6117 24.0833 21 21.6117 21 18.6667V11.6667C21 10.375 19.9583 9.33334 18.6667 9.33334ZM14 21C12.7083 21 11.6667 19.9583 11.6667 18.6667C11.6667 17.375 12.7083 16.3333 14 16.3333C15.2917 16.3333 16.3333 17.375 16.3333 18.6667C16.3333 19.9583 15.2917 21 14 21Z'
        fill='#B39CFF'
      />
    </svg>
  );
}

export function IconDiamondPressed({ className }: IconProps) {
  return (
    <svg
      viewBox='0 0 43 42'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <foreignObject x='-4' y='-4' width='50' height='50'>
        <div
          style={{
            backdropFilter: 'blur(2px)',
            clipPath: 'url(#bgblur_0_504_2838_clip_path)',
            height: '100%',
            width: '100%',
          }}
        ></div>
      </foreignObject>
      <g data-figma-bg-blur-radius='4'>
        <path
          d='M40.5856 20.9998L21 40.5854L1.41439 20.9998L21 1.41421L40.5856 20.9998Z'
          stroke='url(#paint0_radial_504_2838)'
          strokeWidth='2'
        />
        <path
          d='M40.5856 20.9998L21 40.5854L1.41439 20.9998L21 1.41421L40.5856 20.9998Z'
          stroke='#FFDB5A'
          strokeOpacity='0.7'
          strokeWidth='2'
        />
      </g>
      <foreignObject x='4.13068' y='4.00018' width='33.7386' height='34'>
        <div
          style={{
            backdropFilter: 'blur(2px)',
            clipPath: 'url(#bgblur_1_504_2838_clip_path)',
            height: '100%',
            width: '100%',
          }}
        ></div>
      </foreignObject>
      <g data-figma-bg-blur-radius='4'>
        <rect
          y='0.355335'
          width='17.7926'
          height='17.7926'
          transform='matrix(0.703526 0.710669 -0.703526 0.710669 21.25 8.10299)'
          fill='#E8BA15'
        />
        <rect
          y='0.355335'
          width='17.7926'
          height='17.7926'
          transform='matrix(0.703526 0.710669 -0.703526 0.710669 21.25 8.10299)'
          fill='url(#paint1_radial_504_2838)'
          fillOpacity='0.6'
        />
        <rect
          y='0.355335'
          width='17.7926'
          height='17.7926'
          transform='matrix(0.703526 0.710669 -0.703526 0.710669 21.25 8.10299)'
          stroke='url(#paint2_radial_504_2838)'
          strokeWidth='0.5'
        />
        <rect
          y='0.355335'
          width='17.7926'
          height='17.7926'
          transform='matrix(0.703526 0.710669 -0.703526 0.710669 21.25 8.10299)'
          stroke='#FFEA5A'
          strokeOpacity='0.3'
          strokeWidth='0.5'
        />
      </g>
      <defs>
        <clipPath id='bgblur_0_504_2838_clip_path' transform='translate(4 4)'>
          <path d='M40.5856 20.9998L21 40.5854L1.41439 20.9998L21 1.41421L40.5856 20.9998Z' />
        </clipPath>
        <clipPath
          id='bgblur_1_504_2838_clip_path'
          transform='translate(-4.13068 -4.00018)'
        >
          <rect
            y='0.355335'
            width='17.7926'
            height='17.7926'
            transform='matrix(0.703526 0.710669 -0.703526 0.710669 21.25 8.10299)'
          />
        </clipPath>
        <radialGradient
          id='paint0_radial_504_2838'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(35.372 5.67345) rotate(135) scale(13.1007 10.7187)'
        >
          <stop stopColor='#FF8A00' />
          <stop offset='1' stopColor='white' stopOpacity='0' />
        </radialGradient>
        <radialGradient
          id='paint1_radial_504_2838'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(9.14631 -3.04877) rotate(90) scale(21.3414)'
        >
          <stop stopColor='#FAFF00' />
          <stop offset='0.568159' stopColor='white' stopOpacity='0' />
        </radialGradient>
        <radialGradient
          id='paint2_radial_504_2838'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(8.73057 -3.78856) rotate(90) scale(8.06929 6.60215)'
        >
          <stop stopColor='#FF8A00' />
          <stop offset='1' stopColor='white' stopOpacity='0' />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function IconXWhite({ className }: IconProps) {
  return (
    <svg
      viewBox='0 0 72 72'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M56.293 19.2002L39.4932 36L56.293 52.7998L52.7998 56.293L36 39.4932L19.2002 56.293L15.707 52.7998L32.5068 36L15.707 19.2002L19.2002 15.707L36 32.5068L52.7998 15.707L56.293 19.2002Z'
        fill='white'
        stroke='#434343'
      />
    </svg>
  );
}

export function IconChevronLeftWhite({ className }: IconProps) {
  return (
    <svg
      viewBox='0 0 42 42'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M26.25 8.75L16.9214 19.6333C16.2473 20.4198 16.2473 21.5802 16.9214 22.3667L26.25 33.25'
        stroke='white'
        strokeWidth='2.625'
        strokeLinecap='round'
      />
    </svg>
  );
}

export function IconChevronRightWhite({ className }: IconProps) {
  return (
    <svg
      viewBox='0 0 42 42'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M15.75 33.25L25.0786 22.3667C25.7527 21.5802 25.7527 20.4198 25.0786 19.6333L15.75 8.75'
        stroke='white'
        strokeWidth='2.625'
        strokeLinecap='round'
      />
    </svg>
  );
}
