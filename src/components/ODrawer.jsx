import './ODrawer.css';

const ODrawer = ({ visible }) => {
    return <> 
    <svg viewBox="0 0 2933.3 2933.3" xmlns="http://www.w3.org/2000/svg">
        <g transform="matrix(1.3333 0 0 -1.3333 -780 3800)">
        <g transform="scale(.16)">   
            {/* <path d="M 22000,0 H 0 V 22000 H 22000 V 0"/> */}
            
            <clipPath id="OBrushClipLeft" transform="rotate(-73 11000 11000)">
                <path d="m8344.5 13675c16.26-7.9 32.52-15.8 48.79-23.7 164.89 217.9 329.78 435.8 494.68 653.7-20.17 13-40.33 25.9-60.51 38.9-160.98-223-321.98-446-482.96-668.9zm-1059.4-3922.8 58.95 4.2c-15.51 249.1-25.6 498.7-48.1 747.1-21.54 237.9-55.98 474.6-84.75 711.9-12.18-1.2-24.35-2.4-36.52-3.6 36.8-486.5 73.61-973.1 110.42-1459.6zm-1505.1 591c-3.69-547.3 185.87-1426.9 359.87-1689.1-118.68 557.1-247.85 1163.3-359.87 1689.1zm1247.4-1991c-158.72 629.7-317.43 1259.4-461.41 1830.5-48.71-444.7 203.47-1496.3 461.41-1830.5zm3521.4 7957c-107.4-91.7-177.6-151.6-282.9-241.5 400.5 114.9 758.1 217.5 1115.8 320.1 4.3-15.2 8.6-30.4 12.8-45.7-452-222.5-904-445-1356.1-667.6 15.1-30.8 30.1-61.6 45.1-92.5l585.6 300.3c-504.7-418.3-1130.2-675.2-1522-1237.8 1002.8 842.5 2082.7 1487.1 3454.7 1426.2-1035.1-66.5-1998.2-371.2-2770.4-1060.7-747.99-667.9-1522.3-1343-1840.9-2389.3-17.09 72.2-28.19 119.1-42.46 179.4-425.83-1031.1-538.57-2084.6-330.67-3175.4-35.99-0.1-71.98-0.2-107.97-0.2-35.37 637-70.73 1274-107.34 1933.5-178.94-1381.9 132.1-2631 822.48-3806.1 541.28-921.4 1348.7-1485.1 2351.9-1781.6 410.2-121.2 837.8-183.2 1224.9-265.2-169-33.5-391.5-113-614.5-114.6-542.3-3.9-1094.5-27.8-1624.3 63.1-456.17 78.4-884.72 310.9-1329.5 463.6-1100.7 377.7-1909.8 1111.6-2468.1 2105.6-1120.4 1994.8-1029.7 3971.9 196.8 5893.2 383.23 600.3 871.56 1115.8 1466.4 1514.7 272.76 182.9 558.74 365.2 865.16 471.7 189.82 66 420.87 187 576.16 166.4 238.27-31.7 366.3 154.8 560.34 146.6 91.98-3.9 182.8-34.9 274.13-53.7-3.41-23.3-6.83-46.6-10.24-70-160.1-90.6-320.19-181.3-480.29-272 434.07 97.9 807.36 391 1335.5 289.5"/>
                <path d="m7966.1 11703c48.77 680.5 303.37 1247.5 573.35 1809.7-186.36-588.2-372.72-1176.4-573.35-1809.7"/>
            </clipPath>
            
            <clipPath id="OBrushClipRight" transform="rotate(-99 11000 11000)">
                <path d="m13656 8325.2c-16.3 7.9-32.6 15.8-48.8 23.7l-494.7-653.7c20.2-13 40.3-25.9 60.5-38.9 161 223 322 446 483 668.9zm1059.4 3922.8c-19.7-1.4-39.3-2.8-59-4.2 15.5-249.1 25.6-498.7 48.1-747.1 21.5-237.9 56-474.6 84.8-711.9 12.1 1.2 24.3 2.4 36.5 3.6-36.8 486.5-73.6 973.1-110.4 1459.6zm1505-591c3.7 547.3-185.8 1426.9-359.9 1689.1 118.7-557 247.9-1163.3 359.9-1689.1zm-1247.4 1990.9c158.7-629.6 317.4-1259.3 461.4-1830.4 48.7 444.7-203.5 1496.3-461.4 1830.4zm-3521.4-7956.9c107.4 91.7 177.6 151.6 282.9 241.5-400.5-114.9-758.1-217.5-1115.8-320.1-4.3 15.2-8.6 30.4-12.8 45.7 452 222.5 904 445 1356.1 667.6-15.1 30.8-30.1 61.6-45.1 92.5l-585.6-300.3c504.7 418.3 1130.2 675.2 1522 1237.8-1002.8-842.5-2082.7-1487-3454.7-1426.2 1035.1 66.5 1998.2 371.2 2770.4 1060.7 748 667.9 1522.3 1343.1 1840.9 2389.3 17.1-72.2 28.2-119.1 42.5-179.4 425.8 1031.1 538.6 2084.6 330.7 3175.4 36 0.1 71.9 0.2 107.9 0.2 35.4-637 70.8-1274 107.4-1933.5 178.9 1381.9-132.1 2631-822.5 3806.1-541.3 921.4-1348.7 1485.1-2351.9 1781.6-410.2 121.2-837.8 183.2-1224.9 265.3 169 33.4 391.5 112.9 614.5 114.6 542.3 3.9 1094.5 27.7 1624.3-63.2 456.2-78.4 884.8-310.9 1329.6-463.6 1100.7-377.7 1909.7-1111.6 2468-2105.6 1120.4-1994.8 1029.7-3971.9-196.8-5893.2-383.2-600.3-871.5-1115.8-1466.4-1514.7-272.7-182.9-558.7-365.2-865.1-471.7-189.9-66-420.9-187-576.2-166.4-238.3 31.7-366.3-154.8-560.3-146.6-92 3.9-182.8 34.9-274.2 53.7 3.4 23.3 6.9 46.6 10.3 70 160.1 90.6 320.2 181.3 480.3 272-434.1-97.9-807.4-391-1335.5-289.5"/>
                <path d="m14034 10297c-48.7-680.5-303.4-1247.5-573.3-1809.7 186.3 588.2 372.7 1176.4 573.3 1809.7"/>
            </clipPath>

            <g transform="rotate(15 11000 11000)">
                <ellipse className={visible ? "OBrushPath OBrushVisible" : "OBrushPath OBrushHidden"} transform="rotate(73 11000 11000)" rx="4500" ry="5000" cx="11000" cy="11000" clipPath="url(#OBrushClipLeft)"/>
            </g>
            <g transform="rotate(45 10300 10000)">
                <ellipse className={visible ? "OBrushPath OBrushVisible" : "OBrushPath OBrushHidden"} transform="rotate(73 11000 11000)" rx="4500" ry="5000" cx="11000" cy="11000" clipPath="url(#OBrushClipRight)"/>
            </g>
        </g>
        </g>
    </svg>    
    </>
}

export default ODrawer;
