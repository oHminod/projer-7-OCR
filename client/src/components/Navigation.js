import React from "react";
import { NavLink } from "react-router-dom";
import Deconnexion from "./Deconnexion";

const Navigation = () => {
    return (
        <nav>
            <div className="logo">
                <NavLink className="nav-link" title="La timeline" to="/home">
                    <svg className="nav-logo" viewBox="0 0 485 78">
                        <defs />
                        <g id="35fa3215-a46c-2dc7-0ca7-44149903aade">
                            <path d="M121.052 55.6669L121.052 55.6669C114.411 55.6669 108.851 53.4277 104.373 48.9494L104.373 48.9494L104.373 48.9494C99.8943 44.4711 97.6551 38.8809 97.6551 32.1787L97.6551 32.1787L97.6551 32.1787C97.6551 25.5983 99.8943 20.0538 104.373 15.545L104.373 15.545L104.373 15.545C108.851 11.0667 114.411 8.82758 121.052 8.82758L121.052 8.82758L121.052 8.82758C127.724 8.82758 133.451 10.9144 138.234 15.088L138.234 15.088L132.019 21.8969L132.019 21.8969C128.82 19.3988 125.165 18.1497 121.052 18.1497L121.052 18.1497L121.052 18.1497C116.848 18.1802 113.451 19.5054 110.862 22.1254L110.862 22.1254L110.862 22.1254C108.302 24.7149 107.023 28.0355 107.023 32.0873L107.023 32.0873L107.023 32.0873C107.023 36.4437 108.318 39.9015 110.907 42.4605L110.907 42.4605L110.907 42.4605C113.497 45.0195 116.894 46.299 121.098 46.299L121.098 46.299L121.098 46.299C124.479 46.299 127.069 45.644 128.866 44.334L128.866 44.334L128.866 36.2914L122.651 36.3371L122.651 27.5633L138.234 27.5633L138.234 49.4521L138.234 49.4521C133.481 53.5953 127.754 55.6669 121.052 55.6669L121.052 55.6669ZM155.005 24.4102L155.005 27.8832L155.005 27.8832C157.259 25.5983 159.986 24.4559 163.184 24.4559L163.184 24.4559L163.184 24.4559C164.19 24.4559 165.149 24.5321 166.063 24.6844L166.063 24.6844L164.692 33.3211L164.692 33.3211C163.687 32.4072 162.24 31.9197 160.351 31.8588L160.351 31.8588L160.351 31.8588C158.219 32.0111 156.437 33.5496 155.005 36.4742L155.005 36.4742L155.005 55.6669L146.277 55.6669L146.277 25.3698L155.005 24.4102ZM185.941 55.9868L185.941 55.9868C181.402 55.9868 177.609 54.4635 174.563 51.4171L174.563 51.4171L174.563 51.4171C171.547 48.3706 170.039 44.593 170.039 40.0842L170.039 40.0842L170.039 40.0842C170.039 35.545 171.547 31.7522 174.563 28.7057L174.563 28.7057L174.563 28.7057C177.609 25.6593 181.402 24.136 185.941 24.136L185.941 24.136L185.941 24.136C190.481 24.136 194.274 25.6593 197.32 28.7057L197.32 28.7057L197.32 28.7057C200.366 31.7522 201.89 35.545 201.89 40.0842L201.89 40.0842L201.89 40.0842C201.89 44.6235 200.366 48.4011 197.32 51.4171L197.32 51.4171L197.32 51.4171C194.274 54.4635 190.481 55.9868 185.941 55.9868L185.941 55.9868ZM185.941 48.4468L185.941 48.4468L185.941 48.4468C188.287 48.4468 190.207 47.6395 191.699 46.0248L191.699 46.0248L191.699 46.0248C193.192 44.4407 193.938 42.4605 193.938 40.0842L193.938 40.0842L193.938 40.0842C193.938 37.708 193.192 35.7278 191.699 34.1436L191.699 34.1436L191.699 34.1436C190.207 32.529 188.272 31.7217 185.896 31.7217L185.896 31.7217L185.896 31.7217C183.55 31.7217 181.631 32.529 180.138 34.1436L180.138 34.1436L180.138 34.1436C178.676 35.7278 177.945 37.708 177.945 40.0842L177.945 40.0842L177.945 40.0842C177.945 42.4605 178.676 44.4407 180.138 46.0248L180.138 46.0248L180.138 46.0248C181.631 47.6395 183.565 48.4468 185.941 48.4468ZM226.657 44.6082L226.657 44.6082L226.657 24.4102L235.386 24.4102L235.386 55.6669L226.657 55.6669L226.657 52.8337L226.657 52.8337C224.555 54.7225 222.057 55.6669 219.163 55.6669L219.163 55.6669L219.163 55.6669C215.203 55.6669 212.187 54.4635 210.115 52.0568L210.115 52.0568L210.115 52.0568C208.013 49.6501 206.962 46.8931 206.962 43.7857L206.962 43.7857L206.962 24.4102L215.736 24.4102L215.736 41.5922L215.736 41.5922C215.736 43.6638 216.254 45.2785 217.29 46.4361L217.29 46.4361L217.29 46.4361C218.325 47.5938 219.894 48.2031 221.996 48.264L221.996 48.264L221.996 48.264C223.824 48.1421 225.378 46.9235 226.657 44.6082ZM251.562 68.8276L242.834 68.7819L242.834 25.3698L251.562 24.4102L251.562 26.9235L251.562 26.9235C253.908 25.248 256.208 24.4102 258.462 24.4102L258.462 24.4102L258.462 24.4102C263.245 24.4102 267.038 25.9791 269.841 29.117L269.841 29.117L269.841 29.117C272.674 32.2244 274.091 35.8649 274.091 40.0385L274.091 40.0385L274.091 40.0385C274.091 44.2122 272.674 47.8527 269.841 50.9601L269.841 50.9601L269.841 50.9601C267.038 54.098 263.245 55.6669 258.462 55.6669L258.462 55.6669L258.462 55.6669C255.325 55.4536 253.025 54.6006 251.562 53.1078L251.562 53.1078L251.562 68.8276ZM251.562 37.2053L251.562 37.2053L251.562 42.2777L251.562 42.2777C251.989 45.7811 254.182 47.8375 258.143 48.4468L258.143 48.4468L258.143 48.4468C263.139 48.0507 265.957 45.4612 266.596 40.6783L266.596 40.6783L266.596 40.6783C266.383 34.8291 263.565 31.7979 258.143 31.5846L258.143 31.5846L258.143 31.5846C254.182 32.2244 251.989 34.0979 251.562 37.2053ZM294.426 55.9868L294.426 55.9868C289.887 55.9868 286.109 54.4635 283.093 51.4171L283.093 51.4171L283.093 51.4171C280.047 48.3706 278.523 44.593 278.523 40.0842L278.523 40.0842L278.523 40.0842C278.523 35.545 280.047 31.7522 283.093 28.7057L283.093 28.7057L283.093 28.7057C286.109 25.6593 289.887 24.136 294.426 24.136L294.426 24.136L294.426 24.136C298.965 24.136 302.758 25.6593 305.804 28.7057L305.804 28.7057L305.804 28.7057C308.851 31.7522 310.374 35.545 310.374 40.0842L310.374 40.0842L310.374 40.0842C310.374 44.6235 308.851 48.4011 305.804 51.4171L305.804 51.4171L305.804 51.4171C302.758 54.4635 298.965 55.9868 294.426 55.9868L294.426 55.9868ZM294.426 48.4468L294.426 48.4468L294.426 48.4468C296.802 48.4468 298.721 47.6395 300.184 46.0248L300.184 46.0248L300.184 46.0248C301.676 44.4407 302.423 42.4605 302.423 40.0842L302.423 40.0842L302.423 40.0842C302.423 37.708 301.676 35.7278 300.184 34.1436L300.184 34.1436L300.184 34.1436C298.721 32.529 296.787 31.7217 294.38 31.7217L294.38 31.7217L294.38 31.7217C292.034 31.7217 290.115 32.529 288.622 34.1436L288.622 34.1436L288.622 34.1436C287.16 35.7278 286.429 37.708 286.429 40.0842L286.429 40.0842L286.429 40.0842C286.429 42.4605 287.16 44.4407 288.622 46.0248L288.622 46.0248L288.622 46.0248C290.115 47.6395 292.05 48.4468 294.426 48.4468ZM324.951 35.6973L324.951 35.6973L324.951 55.6669L316.178 55.6669L316.178 25.3698L324.951 24.4102L324.951 27.1977L324.951 27.1977C326.901 25.3698 329.399 24.4559 332.446 24.4559L332.446 24.4559L332.446 24.4559C336.376 24.4559 339.392 25.644 341.494 28.0203L341.494 28.0203L341.494 28.0203C343.779 25.644 347.206 24.4559 351.775 24.4559L351.775 24.4559L351.775 24.4559C355.736 24.4559 358.767 25.644 360.869 28.0203L360.869 28.0203L360.869 28.0203C362.941 30.427 363.977 33.1992 363.977 36.3371L363.977 36.3371L363.977 55.6669L355.248 55.6669L355.248 38.4848L355.248 38.4848C355.248 36.4133 354.776 34.7986 353.832 33.641L353.832 33.641L353.832 33.641C352.887 32.5138 351.364 31.9197 349.262 31.8588L349.262 31.8588L349.262 31.8588C347.526 31.9807 346.033 33.1231 344.784 35.2861L344.784 35.2861L344.784 35.2861C344.662 35.9258 344.601 36.5808 344.601 37.251L344.601 37.251L344.601 55.6669L335.873 55.6669L335.873 38.4848L335.873 38.4848C335.873 36.4133 335.401 34.7986 334.456 33.641L334.456 33.641L334.456 33.641C333.512 32.5138 331.989 31.9197 329.887 31.8588L329.887 31.8588L329.887 31.8588C327.967 31.9807 326.322 33.2602 324.951 35.6973ZM375.721 33.5039L372.293 28.2031L372.293 28.2031C376.254 25.705 380.839 24.4559 386.048 24.4559L386.048 24.4559L386.048 24.4559C389.795 24.4559 392.75 25.4917 394.913 27.5633L394.913 27.5633L394.913 27.5633C397.107 29.6654 398.203 32.788 398.203 36.9312L398.203 36.9312L398.203 55.6669L389.475 55.6669L389.475 53.1992L389.475 53.1992C386.916 54.8443 384.616 55.6669 382.575 55.6669L382.575 55.6669L382.575 55.6669C378.432 55.6669 375.309 54.7834 373.207 53.0165L373.207 53.0165L373.207 53.0165C371.136 51.2495 370.1 48.8123 370.1 45.705L370.1 45.705L370.1 45.705C370.1 42.7804 371.09 40.1756 373.07 37.8908L373.07 37.8908L373.07 37.8908C375.02 35.6059 378.188 34.4635 382.575 34.4635L382.575 34.4635L382.575 34.4635C384.616 34.4635 386.916 35.088 389.475 36.3371L389.475 36.3371L389.475 35.3775L389.475 35.3775C389.414 33.0926 387.739 31.8436 384.449 31.6303L384.449 31.6303L384.449 31.6303C380.702 31.6303 377.792 32.2548 375.721 33.5039L375.721 33.5039ZM389.475 46.299L389.475 46.299L389.475 42.7804L389.475 42.7804C388.653 41.1657 386.673 40.3584 383.535 40.3584L383.535 40.3584L383.535 40.3584C379.788 40.7849 377.807 42.2472 377.594 44.7453L377.594 44.7453L377.594 44.7453C377.807 47.213 379.788 48.5534 383.535 48.7666L383.535 48.7666L383.535 48.7666C386.673 48.7666 388.653 47.9441 389.475 46.299ZM414.791 35.8344L414.791 35.8344L414.791 55.6669L406.018 55.6669L406.018 25.3698L414.791 24.4102L414.791 27.2434L414.791 27.2434C416.894 25.3851 419.392 24.4559 422.286 24.4559L422.286 24.4559L422.286 24.4559C426.246 24.4559 429.262 25.644 431.334 28.0203L431.334 28.0203L431.334 28.0203C433.405 30.427 434.441 33.1992 434.441 36.3371L434.441 36.3371L434.441 55.6669L425.713 55.6669L425.713 38.4848L425.713 38.4848C425.713 36.4133 425.195 34.7986 424.159 33.641L424.159 33.641L424.159 33.641C423.093 32.5138 421.509 31.9197 419.407 31.8588L419.407 31.8588L419.407 31.8588C417.609 31.9807 416.071 33.3059 414.791 35.8344ZM450.526 55.6669L441.798 55.6669L441.798 24.4102L450.526 24.4102L450.526 55.6669ZM441.478 16.9616L441.478 16.9616L441.478 16.9616C441.478 18.2107 441.89 19.2465 442.712 20.069L442.712 20.069L442.712 20.069C443.565 20.8916 444.723 21.3028 446.185 21.3028L446.185 21.3028L446.185 21.3028C447.617 21.3028 448.759 20.8916 449.612 20.069L449.612 20.069L449.612 20.069C450.435 19.2465 450.846 18.2107 450.846 16.9616L450.846 16.9616L450.846 16.9616C450.846 15.7126 450.435 14.6615 449.612 13.8085L449.612 13.8085L449.612 13.8085C448.759 12.9555 447.587 12.529 446.094 12.529L446.094 12.529L446.094 12.529C444.692 12.529 443.565 12.9555 442.712 13.8085L442.712 13.8085L442.712 13.8085C441.89 14.6615 441.478 15.7126 441.478 16.9616ZM462.179 33.5039L458.752 28.2031L458.752 28.2031C462.712 25.705 467.297 24.4559 472.507 24.4559L472.507 24.4559L472.507 24.4559C476.254 24.4559 479.224 25.4917 481.417 27.5633L481.417 27.5633L481.417 27.5633C483.581 29.6654 484.662 32.788 484.662 36.9312L484.662 36.9312L484.662 55.6669L475.934 55.6669L475.934 53.1992L475.934 53.1992C473.405 54.8443 471.12 55.6669 469.079 55.6669L469.079 55.6669L469.079 55.6669C464.906 55.6669 461.783 54.7834 459.711 53.0165L459.711 53.0165L459.711 53.0165C457.609 51.2495 456.558 48.8123 456.558 45.705L456.558 45.705L456.558 45.705C456.558 42.7804 457.549 40.1756 459.529 37.8908L459.529 37.8908L459.529 37.8908C461.478 35.6059 464.662 34.4635 469.079 34.4635L469.079 34.4635L469.079 34.4635C471.09 34.4635 473.375 35.088 475.934 36.3371L475.934 36.3371L475.934 35.3775L475.934 35.3775C475.903 33.0926 474.243 31.8436 470.953 31.6303L470.953 31.6303L470.953 31.6303C467.206 31.6303 464.281 32.2548 462.179 33.5039L462.179 33.5039ZM475.934 46.299L475.934 46.299L475.934 42.7804L475.934 42.7804C475.111 41.1657 473.131 40.3584 469.993 40.3584L469.993 40.3584L469.993 40.3584C466.246 40.7849 464.266 42.2472 464.053 44.7453L464.053 44.7453L464.053 44.7453C464.266 47.213 466.246 48.5534 469.993 48.7666L469.993 48.7666L469.993 48.7666C473.131 48.7666 475.111 47.9441 475.934 46.299Z" />
                        </g>
                        <g id="c3a0a99d-5b99-a49f-d46f-4168a2d07e26">
                            <path d="M39.2 78.0275C49.6035 78.0275 59.3569 74.0333 66.6951 66.6951C74.0333 59.3569 78.0276 49.6035 78.0276 39.2C78.0276 28.7964 74.0333 19.0431 66.6951 11.7049C59.3569 4.36664 49.6036 0.372414 39.2 0.372414C28.7964 0.372414 19.0431 4.36664 11.7049 11.7049C4.36665 19.0431 0.372425 28.7964 0.372425 39.2C0.372425 49.6035 4.36665 59.3569 11.7049 66.6951C19.0431 74.0333 28.7964 78.0275 39.2 78.0275ZM41.4293 71.4324C40.6862 71.5253 39.9431 71.5253 39.2 71.5253C38.1782 71.5253 37.1564 71.4324 36.1347 71.3395C32.7907 66.1378 30.2827 60.5644 28.7964 54.7124L45.2378 54.7124C45.7951 56.1058 46.8169 57.4062 48.0244 58.2422C46.4453 62.8867 44.216 67.2524 41.4293 71.4324ZM50.2538 69.5747C52.0187 66.3235 53.412 63.0724 54.5267 59.6355C57.2204 59.0782 59.3569 57.2204 60.3787 54.7124L67.5311 54.7124C63.8156 61.4933 57.592 66.788 50.2538 69.5747ZM71.4324 39.2C71.4324 42.2653 70.968 45.2378 70.2249 48.1173L60.1929 48.1173C59.6356 46.9098 58.7067 45.7951 57.592 44.9591C57.7778 42.9155 57.8707 40.872 57.8707 38.8284C57.8707 35.9489 57.6849 33.0693 57.3133 30.2826L70.132 30.2826C71.0609 33.0693 71.4324 36.1346 71.4324 39.2ZM67.5311 23.6875L56.1987 23.6875C54.9911 18.5786 53.2262 13.7484 50.8111 9.10397C57.8707 11.7977 63.8156 17.0924 67.5311 23.6875ZM51.3684 38.8284C51.3684 40.4075 51.2756 41.9866 51.1827 43.5658C48.5818 44.1231 46.4453 45.7951 45.4235 48.1173L27.496 48.1173C27.1244 45.3306 26.8458 42.4511 26.8458 39.6644C26.8458 37.8995 26.9387 36.1346 27.1244 34.3698C29.5395 33.9053 31.4902 32.3262 32.6978 30.2826L50.8111 30.2826C51.1827 33.0693 51.3684 35.9489 51.3684 38.8284ZM36.7849 7.06041C37.6209 6.96752 38.4569 6.96752 39.2 6.96752C40.1289 6.96752 41.0578 6.96752 41.9867 7.06041C45.3307 12.2622 47.8387 17.8355 49.3249 23.6875L33.1622 23.6875C32.6049 22.1084 31.5831 20.7151 30.2827 19.6933C31.9547 15.2346 34.0911 11.0546 36.7849 7.06041ZM27.9604 8.91819C26.3813 11.8906 24.988 15.0489 23.8733 18.2071C20.9938 18.7644 18.6715 20.9009 17.7427 23.5946L10.9618 23.5946C14.5844 16.9995 20.6222 11.7049 27.9604 8.91819ZM6.96754 39.2C6.96754 36.1346 7.43198 33.0693 8.26798 30.2826L18.3929 30.2826C18.9502 31.3044 19.7862 32.2333 20.7151 32.9764C20.5293 35.2058 20.3435 37.4351 20.3435 39.6644C20.3435 42.544 20.5293 45.3306 20.9009 48.1173L8.26798 48.1173C7.33909 45.2378 6.96754 42.2653 6.96754 39.2ZM22.0155 54.6195C23.2231 59.6355 24.988 64.5587 27.4031 69.2031C20.3435 66.4164 14.4915 61.2146 10.8689 54.6195C10.8689 54.6195 22.0155 54.6195 22.0155 54.6195Z" />
                        </g>
                    </svg>
                </NavLink>
            </div>
            <ul>
                <li>
                    <NavLink className="nav-link" to="/membre">
                        <i className="fa-regular fa-user" title="Profile"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/">
                        <Deconnexion />
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
