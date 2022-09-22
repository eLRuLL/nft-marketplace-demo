export default function NavigationBar() {
    return (
        <nav className="bg-gray-800 flex flex-1 items-center justify-center sm:items-stretch sm:justify-start flex h-16 items-center justify-between">
            <div className="logo flex items-center p-3">
                <svg viewBox="0 0 223.09252759173975 223.09252759173975" height="40">
                    <g>
                        <path
                            d="M0 111.546c0-61.605 49.941-111.546 111.546-111.546 61.605 0 111.546 49.941 111.547 111.546 0 61.605-49.941 111.546-111.547 111.547-61.605 0-111.546-49.941-111.546-111.547zM111.546 218.426c59.028 0 106.88-47.852 106.88-106.88 0-59.028-47.852-106.88-106.88-106.88-59.028 0-106.88 47.852-106.88 106.88 0 59.028 47.852 106.88 106.88 106.88z"
                            data-fill-palette-color="accent" fill="#010c80" stroke="transparent"></path>
                        <ellipse rx="110.43080115791118" ry="110.43080115791118" cx="111.54626379586988"
                                 cy="111.54626379586988" fill="#010c80" stroke="transparent" strokeWidth="0"
                                 fillOpacity="1" data-fill-palette-color="accent"></ellipse>
                    </g>
                    <g transform="matrix(1,0,0,1,44.34158196754794,52.56108845208378)">
                        <svg viewBox="0 0 134.40936365664388 117.97035068757219" height="117.97035068757219"
                             width="134.40936365664388">
                            <g>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0" y="0" viewBox="9.293296813964844 9.293296813964844 81.41410064697266 71.45670318603516" enableBackground="new 0 0 100 100" xmlSpace="preserve" height="117.97035068757219" width="134.40936365664388" className="icon-x-0" data-fill-palette-color="quaternary" id="x-0"><rect x="17.929" y="14" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 32.0711 43.2843)" width="14.142" height="2" fill="#ffffff" data-fill-palette-color="quaternary"></rect><rect
                                    x="14" y="17.929" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 43.2843 32.0711)"
                                    width="2" height="14.142" fill="#ffffff"
                                    data-fill-palette-color="quaternary"></rect><rect x="74" y="7.929"
                                                                                      transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 117.4264 78.6396)"
                                                                                      width="2" height="14.142"
                                                                                      fill="#ffffff"
                                                                                      data-fill-palette-color="quaternary"></rect><rect
                                    x="84" y="17.929"
                                    transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 127.4264 102.7817)" width="2"
                                    height="14.142" fill="#ffffff" data-fill-palette-color="quaternary"></rect><path
                                    d="M88.939 52.475c1.364-1.364 1.364-3.585 0-4.949L52.475 11.061c-1.365-1.365-3.584-1.365-4.949 0L11.061 47.525c-1.364 1.364-1.364 3.585 0 4.949l6.775 6.775H10v1.5h30v-1.5H20.664l-8.189-8.189c-0.585-0.585-0.585-1.536 0-2.121l36.465-36.465c0.584-0.584 1.537-0.584 2.121 0l36.465 36.465c0.585 0.585 0.585 1.536 0 2.121l-8.189 8.189H70v1.5h20v-1.5h-7.836L88.939 52.475z"
                                    fill="#ffffff" data-fill-palette-color="quaternary"></path><rect x="30" y="69.25"
                                                                                                     width="30"
                                                                                                     height="1.5"
                                                                                                     fill="#ffffff"
                                                                                                     data-fill-palette-color="quaternary"></rect><rect
                                    x="10" y="79.25" width="80" height="1.5" fill="#ffffff"
                                    data-fill-palette-color="quaternary"></rect></svg>
                            </g>
                        </svg>
                    </g>
                </svg>
            </div>
            <div className="links flex items-center space-x-4">
                <a href="/"
                   className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Market</a>
                <a href="/sell"
                   className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sell</a>
                <a href="/owned"
                   className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Owned</a>
            </div>
        </nav>
    );
}
