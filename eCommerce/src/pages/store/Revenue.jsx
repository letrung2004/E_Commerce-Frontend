import React, { useEffect, useState } from "react";
import { authAPIs, endpoints } from "../../configs/APIs";
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Revenue = () => {
    const [loading, setLoading] = useState(false);
    const [allRevenueData, setAllRevenueData] = useState([]);
    const [productRevenueData, setProductRevenueData] = useState([]);
    const [categoryRevenueData, setCategoryRevenueData] = useState([]);
    const [activeTab, setActiveTab] = useState("month");

    const infoTimes = [
        { label: "Tháng", field: "month" },
        { label: "Quý", field: "quarter" },
        { label: "Năm", field: "year" }
    ];

    const getCurrentPeriodStats = () => {
        if (allRevenueData.length === 0) {
            return { totalRevenue: 0, totalOrders: 0, averageOrderValue: 0 };
        }

        let currentData = [];
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;
        const currentQuarter = Math.floor(now.getMonth() / 3) + 1;

        if (activeTab === 'month') {
            const monthStr = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
            const currentPeriod = `${currentYear}-${monthStr}`;
            currentData = allRevenueData.filter(item => item.period === currentPeriod);
        } else if (activeTab === 'quarter') {
            const currentPeriod = `${currentYear}-Q${currentQuarter}`;
            currentData = allRevenueData.filter(item => item.period === currentPeriod);
        } else {
            const currentPeriod = `${currentYear}`;
            currentData = allRevenueData.filter(item => item.period === currentPeriod);
        }

        if (currentData.length === 0) {
            currentData = allRevenueData;
        }

        const totalRevenue = currentData.reduce((sum, item) => sum + item.totalRevenue, 0);
        const totalOrders = currentData.reduce((sum, item) => sum + item.orderCount, 0);
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        return { totalRevenue, totalOrders, averageOrderValue };
    };

    const { totalRevenue, totalOrders, averageOrderValue } = getCurrentPeriodStats();



    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedQuarter, setSelectedQuarter] = useState(Math.floor(new Date().getMonth() / 3) + 1);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [viewType, setViewType] = useState('bieu_do');
    const getCurrentMonthValue = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const monthStr = month < 10 ? `0${month}` : month;
        return `${year}-${monthStr}`;
    };

    const [timeValue, setTimeValue] = useState(getCurrentMonthValue());

    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 3 }, (_, i) => currentYear - 2 + i);

    const renderTimeOptions = () => {
        if (activeTab === 'month') {
            return (
                <div className="flex items-center gap-4">
                    <select
                        value={selectedMonth}
                        onChange={(e) => {
                            const newMonth = parseInt(e.target.value);
                            setSelectedMonth(newMonth);
                            const monthStr = newMonth < 10 ? `0${newMonth}` : newMonth;
                            setTimeValue(`${selectedYear}-${monthStr}`);
                        }}
                        className="border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i} value={i + 1}>
                                Tháng {i + 1}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedYear}
                        onChange={(e) => {
                            const newYear = parseInt(e.target.value);
                            setSelectedYear(newYear);
                            const monthStr = selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth;
                            setTimeValue(`${newYear}-${monthStr}`);

                        }}
                        className="border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                        {yearOptions.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            );
        } else if (activeTab === 'quarter') {
            return (
                <div className="flex items-center gap-4">
                    <select
                        value={selectedQuarter}
                        onChange={(e) => {
                            const newQuarter = parseInt(e.target.value);
                            setSelectedQuarter(newQuarter);
                            setTimeValue(`${selectedYear}-Q${newQuarter}`);
                        }}
                        className="border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                        {[1, 2, 3, 4].map((quarter) => (
                            <option key={quarter} value={quarter}>
                                Quý {quarter}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedYear}
                        onChange={(e) => {
                            const newYear = parseInt(e.target.value);
                            setSelectedYear(newYear);
                            setTimeValue(`${newYear}-Q${selectedQuarter}`);
                        }}
                        className="border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                        {yearOptions.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            );
        } else {
            return (
                <select
                    value={selectedYear}
                    onChange={(e) => {
                        const newYear = parseInt(e.target.value);
                        setSelectedYear(newYear);
                        setTimeValue(`${newYear}`);
                    }}
                    className="border border-gray-300 rounded px-3 py-2 text-sm"
                >
                    {yearOptions.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            );
        }
    };

    const handleResetFilters = () => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const currentQuarter = Math.floor(new Date().getMonth() / 3) + 1;
        setActiveTab("month");
        setSelectedYear(currentYear);
        setSelectedQuarter(currentQuarter);
        setSelectedMonth(currentMonth);
        const monthStr = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
        setTimeValue(`${currentYear}-${monthStr}`);
    };


    const formatCurrency = (value) => {
        return value.toLocaleString("vi-VN") + " ₫";
    };

    const renderRevenueChart = () => {
        if (allRevenueData.length === 0) {
            return (
                <div className="w-full h-80 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-gray-500">Không có dữ liệu hiển thị</div>
                </div>
            );
        }

        return (
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={allRevenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Line type="monotone" dataKey="totalRevenue" name="Doanh thu" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        );
    };

    useEffect(() => {
        let isMounted = true;

        const loadAllRevenue = async () => {
            setLoading(true);
            try {
                const [all, product, category] = await Promise.all([
                    authAPIs().get(`${endpoints.allRevenue}?period=${activeTab}&timeValue=${timeValue}`),
                    authAPIs().get(`${endpoints.productRevenue}?period=${activeTab}&timeValue=${timeValue}`),
                    authAPIs().get(`${endpoints.categoryRevenue}?period=${activeTab}&timeValue=${timeValue}`)
                ]);

                if (isMounted) {
                    setAllRevenueData(all.data || []);
                    setProductRevenueData(product.data || []);
                    setCategoryRevenueData(category.data || []);
                }
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu doanh thu:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadAllRevenue();

        return () => {
            isMounted = false;
        };
    }, [timeValue, activeTab]);



    return (
        <div className="p-6 bg-white rounded-md shadow-sm">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Báo cáo doanh thu</h1>
                <p className="text-gray-500 mt-1">Xem thống kê doanh thu theo thời gian, sản phẩm và danh mục</p>
            </div>

            <div className="flex space-x-4 border-b-2 border-gray-200">
                {infoTimes.map((tab) => (
                    <button
                        key={tab.field}
                        onClick={() => setActiveTab(tab.field)}
                        className={`px-4 py-3 font-semibold transition
                ${activeTab === tab.field ? 'border-b-3 border-purple-600 text-purple-600' : 'text-gray-600 hover:text-purple-700'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <h3 className="text-sm text-gray-500">Tổng doanh thu</h3>
                    <p className="text-2xl font-bold text-purple-700 mt-2">{formatCurrency(totalRevenue)}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="text-sm text-gray-500">Tổng đơn hàng</h3>
                    <p className="text-2xl font-bold text-blue-700 mt-2">{totalOrders}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h3 className="text-sm text-gray-500">Giá trị đơn trung bình</h3>
                    <p className="text-2xl font-bold text-green-700 mt-2">{formatCurrency(averageOrderValue)}</p>
                </div>
            </div>

            <div className="mt-8 mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Biểu đồ doanh thu theo thời gian</h2>
                <div className="flex gap-2 ml-auto">
                    <button
                        onClick={() => setViewType('bieu_do')}
                        className={`px-3 py-1 text-sm rounded-full border border-gray-300 ${viewType === 'bieu_do' ? 'bg-purple-100 text-purple-600 border-purple-300' : 'bg-white text-gray-600'
                            }`}
                    >
                        Biểu đồ
                    </button>
                    <button
                        onClick={() => setViewType('bang')}
                        className={`px-3 py-1 text-sm rounded-full border border-gray-300 ${viewType === 'bang' ? 'bg-purple-100 text-purple-600 border-purple-300' : 'bg-white text-gray-600'
                            }`}
                    >
                        Bảng
                    </button>
                </div>
            </div>

            {viewType === 'bieu_do' ? (
                renderRevenueChart()
            ) : (
                <div className="mt-6">
                    <div className="grid grid-cols-4 bg-gray-100 text-gray-600 text-sm font-medium px-4 py-3 rounded">
                        <div>Thời gian</div>
                        <div className="flex justify-center">Doanh thu</div>
                        <div className="flex justify-center">Đơn hàng</div>
                        <div className="flex justify-center">Giá trị TB</div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                        </div>
                    ) : allRevenueData.length > 0 ? (
                        allRevenueData.map((item, index) => (
                            <div key={index} className="grid grid-cols-4 text-sm px-4 py-4 mt-2 bg-gray-50 shadow items-center">
                                <div className="border-r border-gray-200">{item.period}</div>
                                <div className="border-r border-gray-200 flex justify-center font-medium text-gray-800"> {formatCurrency(item.totalRevenue)}</div>
                                <div className="border-r border-gray-200 flex justify-center">{item.orderCount}</div>
                                <div className="flex justify-center"> {formatCurrency(item.averagePrice)}</div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p className="font-medium">Không có dữ liệu nào</p>
                        </div>
                    )}
                </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-4">
                {renderTimeOptions()}
                <button onClick={handleResetFilters} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-300 rounded bg-gray-200">Đặt lại</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Doanh thu theo sản phẩm</h2>
                    <div>
                        <div className="grid grid-cols-4 bg-gray-100 text-gray-600 text-sm font-medium px-4 py-3 rounded">
                            <div>Sản phẩm</div>
                            <div className="flex justify-center">Doanh thu</div>
                            <div className="flex justify-center">Đơn hàng</div>
                            <div className="flex justify-center">SL Bán</div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-10">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600"></div>
                            </div>
                        ) : productRevenueData.length > 0 ? (
                            productRevenueData.map((item, index) => (
                                <div key={index} className="grid grid-cols-4 text-sm px-4 py-4 mt-2 bg-gray-50 shadow items-center">
                                    <div className="border-r border-gray-200">{item.name}</div>
                                    <div className="border-r border-gray-200 flex justify-center font-medium text-gray-800">{formatCurrency(item.totalRevenue)}</div>
                                    <div className="border-r border-gray-200 flex justify-center">{item.orderCount}</div>
                                    <div className="flex justify-center">{item.quantitySold}</div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <p className="font-medium">Không có dữ liệu nào</p>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Doanh thu theo danh mục</h2>
                    <div>
                        <div className="grid grid-cols-4 bg-gray-100 text-gray-600 text-sm font-medium px-4 py-3 rounded">
                            <div>Danh mục</div>
                            <div className="flex justify-center">Doanh thu</div>
                            <div className="flex justify-center">Đơn hàng</div>
                            <div className="flex justify-center">SL Bán</div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-10">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600"></div>
                            </div>
                        ) : categoryRevenueData.length > 0 ? (
                            categoryRevenueData.map((item, index) => (
                                <div key={index} className="grid grid-cols-4 text-sm px-4 py-4 mt-2 bg-gray-50 shadow items-center">
                                    <div className="border-r border-gray-200">{item.name}</div>
                                    <div className="border-r border-gray-200 flex justify-center font-medium text-gray-800">{formatCurrency(item.totalRevenue)}</div>
                                    <div className="border-r border-gray-200 flex justify-center">{item.orderCount}</div>
                                    <div className="flex justify-center">{item.quantitySold}</div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <p className="font-medium">Không có dữ liệu nào</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Revenue;