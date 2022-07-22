import { ProductCreatedPublisher } from "./events/publishers/ProductCreatedPublisher";
import { Product } from "./models/product";
import { natsWrapper } from "./natsWrapper";

export class Seed {
    static async init() {
        const products = [
            {
                title: "iPhone 12 Pro Max",
                manufacturer: 'Apple',
                price: 1599,
                sale: 10,
                quantity: 3,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone12pro-productCard_utfct6.png"
                }]
            },
            {
                title: "Macbook Air",
                manufacturer: 'Apple',
                price: 1199,
                sale: 5,
                quantity: 5,
                description: "This is the best phone ever created buy all of them",
                category: "Laptops",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233034/products/macbookair_vjqwnd.png"
                }]
            },
            {
                title: "iPhone 11 Pro",
                manufacturer: 'Apple',
                price: 750,
                sale: 0,
                quantity: 5,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone11pro-productCard_ghjyh1.png"
                }]
            },
            {
                title: "MSI Gaming Laptop",
                manufacturer: 'MSI',
                price: 2000,
                sale: 20,
                quantity: 5,
                description: "This is the best phone ever created buy all of them",
                category: "Laptops",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233035/products/msilaptop_wcmz3b.png"
                }]
            },
            {
                title: "Tablet Lenovo",
                manufacturer: 'Lenovo',
                price: 250,
                sale: 20,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Laptops",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233034/products/lenovotablet_cyyd8c.png"
                }]
            },
            {
                title: "Macbook Pro M1 8GB RAM 256GB SSD",
                manufacturer: 'Apple',
                price: 1599,
                sale: 10,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Laptops",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233034/products/macbookpro-productCard_uf3nyp.png"
                }]
            },
            {
                title: "Mac Mini M1 8GB RAM 512 SSD",
                manufacturer: 'Apple',
                price: 785,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "PC",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233034/products/macmini_zutrwv.png"
                }]
            },
            {
                title: "Laptop Dell XPS Standard",
                manufacturer: 'Dell',
                price: 999,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Laptops",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233034/products/laptopdell3_krnxae.png"
                }]
            },
            {
                title: "JBL MXMASTER3 Headphones",
                manufacturer: 'JBL',
                price: 55,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Accessories",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233034/products/jbl-productCard_k8agmi.png"
                }]
            },
            {
                title: "iPhone X 64GB Storage",
                manufacturer: 'Apple',
                price: 450,
                sale: 70,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233034/products/iphonex-productCard_fd8ys2.png"
                }]
            },
            {
                title: "iPhone XR 32GB",
                manufacturer: 'Apple',
                price: 250,
                sale: 70,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233034/products/iphonexr-productCard_hqchsb.png"
                }]
            },
            {
                title: "iPhone 12",
                manufacturer: 'Apple',
                price: 650,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone12-productCard_jhssqu.png"
                }]
            },
            {
                title: "iPad Air",
                manufacturer: 'Apple',
                price: 300,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Laptops",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/ipadair_flkh9s.png"
                }]
            },
            {
                title: "iPad Mini",
                manufacturer: 'Apple',
                price: 200,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Laptops",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/ipadmini_vniq4q.png"
                }]
            },
            {
                title: "Go Pro Camera",
                manufacturer: 'GoPro',
                price: 400,
                sale: 3,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Other",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233032/products/gopro_shehc9.png"
                }]
            },
            {
                title: "iPhone 11 16GB",
                manufacturer: 'Apple',
                price: 400,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone11-productCard_tau6ld.png"
                }]
            },
            {
                title: "iMac 64GB RAM 1TB Storage",
                manufacturer: 'Apple',
                price: 1799,
                sale: 50,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "PC",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233032/products/imac_cphh1b.png"
                }]
            },
            {
                title: "Huawei Mate Pro",
                manufacturer: 'Huawei',
                price: 1560,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Laptops",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233032/products/huawei-xpro_iwkkj3.png"
                }]
            },
            {
                title: "iPad Pro",
                manufacturer: 'Apple',
                price: 785,
                sale: 10,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Laptops",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/ipadpro_ast7dd.png"
                }]
            },
            {
                title: "Dell XPS 15 Laptop",
                manufacturer: 'Dell',
                price: 1400,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Laptops",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233032/products/dellxps15_vq1olu.png"
                }]
            },
            {
                title: "HyperX Cloud 2 Over ear headphones",
                manufacturer: 'HyperX',
                price: 70,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Accessories",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233032/products/hyperx-cloud2_gq0rox.png"
                }]
            },
            {
                title: "Dell XPS 13inch Laptop",
                manufacturer: 'Dell',
                price: 1149,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Laptops",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233032/products/dellxps13_zmwqhn.png"
                }]
            },
            {
                title: "Dell P2419H Monitor",
                manufacturer: 'Dell',
                price: 259,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Other",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233031/products/dellmonitor_mb2ink.png"
                }]
            },
            {
                title: "Asus ROG Gaming Laptop RGB",
                manufacturer: 'Asus',
                price: 999,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Laptops",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233031/products/asusrog-productCard_aa9wzf.png"
                }]
            },
            {
                title: "Dell S3819H Monitor",
                manufacturer: 'Dell',
                price: 1215,
                sale: 4,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Other",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233031/products/dell38inchmonitor_bsajfe.png"
                }]
            },
            {
                title: "Dell S4919H Monitor",
                manufacturer: 'Dell',
                price: 1350,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Other",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233031/products/dellultrawidemonitor_bx2nam.png"
                }]
            },
            {
                title: "Asus ZenBook Laptop",
                manufacturer: 'Asus',
                price: 1350,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Laptops",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233031/products/asuszenbook_ojxkab.png"
                }]
            },
            {
                title: "Asus TUF Gaming Monitor 244Hz",
                manufacturer: 'Asus',
                price: 599,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Other",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233031/products/asusmonitor_hvipc9.png"
                }]
            },
            {
                title: "Beats By Dre Studio",
                manufacturer: 'Apple',
                price: 245,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Accessories",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233031/products/beats-productCard_zreudc.png"
                }]
            },
            {
                title: "Alienware Aurora Gaming",
                manufacturer: 'Dell',
                price: 899,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "PC",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233030/products/alienware-aurora_b2tlfs.png"
                }]
            },
            {
                title: "Apple Watch Series 6 Pink Stainless Steel",
                manufacturer: 'Apple',
                price: 390,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Watches",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233030/products/applewatch_zqnicr.png"
                }]
            },
            {
                title: "Apple Watch Series 6 44MM",
                manufacturer: 'Apple',
                price: 450,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Watches",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233030/products/appleseries6-productCard_nxfpi1.png"
                }]
            },
            {
                title: "Apple Airpods Pro",
                manufacturer: 'Apple',
                price: 210,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Accessories",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233030/products/airpodspro_qrcqzf.png"
                }]
            },
            {
                title: "Sony TV 4K 75\"",
                manufacturer: 'Sony',
                price: 2000,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "TV",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233029/products/sonytv_qogmps.png"
                }]
            },
            {
                title: "Nintendo Switch Handheld",
                manufacturer: 'Nintendo',
                price: 360,
                sale: 5,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Consoles",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233030/products/switch-productCard_sw8doo.png"
                }]
            },
            {
                title: "Acer Swift 5",
                manufacturer: 'Acer',
                price: 360,
                sale: 5,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Laptops",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233030/products/acerswift5_recdxf.png"
                }]
            },
            {
                title: "Zowiee Gaming Mouse",
                manufacturer: 'Zowie',
                price: 75,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Other",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233029/products/zowieec2_rl7ouw.png"
                }]
            },
            {
                title: "Xbox Series X",
                manufacturer: 'Microsoft',
                price: 450,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Consoles",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233029/products/xboxseries-productCard_jub7eq.png"
                }]
            },
            {
                title: "Xbox Series S",
                manufacturer: 'Microsoft',
                price: 300,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Consoles",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233029/products/xbox-seriesS_prbm7a.jpg"
                }]
            },
            {
                title: "Apple XDR Monitor 32",
                manufacturer: 'Apple',
                price: 5000,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Other",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233029/products/xdr-prodisplay_mpthgw.png"
                }]
            },
            {
                title: "Sony TV 65 inch",
                manufacturer: 'Apple',
                price: 1200,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Other",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233029/products/sonytvishtrejt_edi9tn.png"
                }]
            },
            {
                title: "MSI Monitor",
                manufacturer: 'MSI',
                price: 450,
                sale: 10,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Other",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233027/products/msimonitor_ege2t3.png"
                }]
            },
            {
                title: "Samsung Ultra Wide WQHD",
                manufacturer: 'Samsung',
                price: 290,
                sale: 10,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Other",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233029/products/samsungultrawide_qm2zbo.png"
                }]
            },
            {
                title: "Samsung TV 65\"",
                manufacturer: 'Samsung',
                price: 980,
                sale: 10,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "TV",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233028/products/samsungtv_jtv0uz.png"
                }]
            },
            {
                title: "Samsung Galaxy Watch 3",
                manufacturer: 'Samsung',
                price: 250,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Watches",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233028/products/samsung-galaxyWatch3_mk8tzn.png"
                }]
            },
            {
                title: "Samsung Galaxy Tab 7",
                manufacturer: 'Other',
                price: 490,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Laptops",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233028/products/samsungtab7_l0l6no.png"
                }]
            },
            {
                title: "Samsung Galaxy A72 5G",
                manufacturer: 'Samsung',
                price: 500,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233028/products/samsung-galaxyCel_cf12gi.png"
                }]
            },
            {
                title: "Samsung Galaxy S21",
                manufacturer: 'Samsung',
                price: 1200,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233028/products/samsung-galaxyS21_sdwnbn.png"
                }]
            },
            {
                title: "Origin PC",
                manufacturer: 'Origin',
                price: 1200,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "PC",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233027/products/originpc-productCard_ssbrwc.png"
                }]
            },
            {
                title: "MSI Raider 64GB Ram 1TB Storage",
                manufacturer: 'MSI',
                price: 1500,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Laptops",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233027/products/msiraider_lt6rpo.png"
                }]
            },
            {
                title: "Razer Kraken Headphones",
                manufacturer: 'Razer',
                price: 50,
                sale: 1,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Accessories",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233027/products/razerkraken-productCard_dlzey4.png"
                }]
            },
            {
                title: "Omen Gaming PC",
                manufacturer: 'Dell',
                price: 1500,
                sale: 50,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "PC",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233027/products/omenpc_ihikth.png"
                }]
            },
            {
                title: "Playstation 5",
                manufacturer: 'Sony',
                price: 500,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Consoles",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233027/products/ps5-productCard_rvahmn.png"
                }]
            },
            {
                title: "Spiderman PS5",
                manufacturer: 'Sony',
                price: 65,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Games",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658235602/products/50094555187_7f5e4b4325_o_hzlbej.jpg"
                }]
            },
            {
                title: "God Of War Ragnarok",
                manufacturer: 'Sony',
                price: 70,
                sale: 0,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Games",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658235602/products/d9ya20p4x5n71_wxtrut.webp"
                }]
            },
            {
                title: "NBA 2K22 PS5",
                manufacturer: 'Sony',
                price: 70,
                sale: 5,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Games",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658235601/products/nba-2k22----playstation-5_jyrt9z.jpg"
                }]
            },
            {
                title: "Fifa 22 PS5",
                manufacturer: 'Sony',
                price: 70,
                sale: 1,
                quantity: 10,
                description: "This is the best phone ever created buy all of them",
                category: "Games",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658235601/products/E.A-Fifa-22-For-Sony-Playstation-Ps5---New-Japan-Figure-4938833023735-0_qor5sg.jpg"
                }]
            },
            {
                title: "Demo Item 1",
                manufacturer: 'Apple',
                price: 750,
                sale: 0,
                quantity: 5,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone11pro-productCard_ghjyh1.png"
                }]
            },
            {
                title: "Demo Item 2",
                manufacturer: 'Apple',
                price: 750,
                sale: 0,
                quantity: 5,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone11pro-productCard_ghjyh1.png"
                }]
            },
            {
                title: "Demo Item 3",
                manufacturer: 'Apple',
                price: 750,
                sale: 0,
                quantity: 5,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone11pro-productCard_ghjyh1.png"
                }]
            },
            {
                title: "Demo Item 4",
                manufacturer: 'Apple',
                price: 750,
                sale: 0,
                quantity: 5,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone11pro-productCard_ghjyh1.png"
                }]
            },
            {
                title: "Demo Item 5",
                manufacturer: 'Apple',
                price: 750,
                sale: 0,
                quantity: 5,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone11pro-productCard_ghjyh1.png"
                }]
            },
            {
                title: "Demo Item 6",
                manufacturer: 'Apple',
                price: 750,
                sale: 0,
                quantity: 5,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone11pro-productCard_ghjyh1.png"
                }]
            },
            {
                title: "Demo Item 7",
                manufacturer: 'Apple',
                price: 750,
                sale: 0,
                quantity: 5,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone11pro-productCard_ghjyh1.png"
                }]
            },
            {
                title: "Demo Item 8",
                manufacturer: 'Apple',
                price: 750,
                sale: 0,
                quantity: 5,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone11pro-productCard_ghjyh1.png"
                }]
            },
            {
                title: "Demo Item 9",
                manufacturer: 'Apple',
                price: 750,
                sale: 0,
                quantity: 5,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone11pro-productCard_ghjyh1.png"
                }]
            },
            {
                title: "Demo Item 10",
                manufacturer: 'Apple',
                price: 750,
                sale: 0,
                quantity: 5,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone11pro-productCard_ghjyh1.png"
                }]
            },
            {
                title: "Demo Item 11",
                manufacturer: 'Apple',
                price: 750,
                sale: 0,
                quantity: 5,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone11pro-productCard_ghjyh1.png"
                }]
            },
            {
                title: "Demo Item 12",
                manufacturer: 'Apple',
                price: 750,
                sale: 0,
                quantity: 5,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone11pro-productCard_ghjyh1.png"
                }]
            },
            {
                title: "Demo Item 13",
                manufacturer: 'Apple',
                price: 750,
                sale: 0,
                quantity: 5,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone11pro-productCard_ghjyh1.png"
                }]
            },
            {
                title: "Demo Item 14",
                manufacturer: 'Apple',
                price: 750,
                sale: 0,
                quantity: 5,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone11pro-productCard_ghjyh1.png"
                }]
            },
            {
                title: "Demo Item 15",
                manufacturer: 'Apple',
                price: 750,
                sale: 0,
                quantity: 5,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone11pro-productCard_ghjyh1.png"
                }]
            },
            {
                title: "Demo Item 16",
                manufacturer: 'Apple',
                price: 750,
                sale: 0,
                quantity: 5,
                description: "This is the best phone ever created buy all of them",
                category: "Phones",
                images: [{
                    url: "https://res.cloudinary.com/dcfzd0pgt/image/upload/v1658233033/products/iphone11pro-productCard_ghjyh1.png"
                }]
            },
        ]

        for (const productObj of products) {
            const { title, manufacturer, price, sale, quantity, description, category, images } = productObj;

            const product = Product.build({
                title,
                manufacturer,
                price,
                sale,
                quantity,
                description,
                category,
                images,
            });
            await product.save();

            // Publish the product created event
            new ProductCreatedPublisher(natsWrapper.client).publish({
                id: product.id,
                title: product.title,
                image: product.images[0].url,
                price: product.price,
                quantity: product.quantity,
                sale: product.sale,
                version: product.version,
            });
        }
    }
}
