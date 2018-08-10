package main

import (
	"fmt"
	"net"
	"strings"
)

var (
	ads []net.Conn
)

func main() {
	l, err := net.Listen("tcp", ":9898")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("Current IP :", getIP())
	go listenStdin()
	for {
		c, err := l.Accept()
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println("New Connection:", c.RemoteAddr().String())
		handle(c)
	}
}
func handle(c net.Conn) {
	defer c.Close()
	ads = append(ads, c)
	b := make([]byte, 128)
	for {
		l, err := c.Read(b)
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println(string(b[:l]))
	}
}
func listenStdin() {
	str := ""
	for {
		fmt.Scanf("%s", &str)
		if len(ads) < 1 {
			fmt.Println("No connection for now")
			continue
		}
		for _, v := range ads {
			v.Write([]byte(str + "\n"))
		}
	}
}
func getIP() string {
	ifaces, err := net.Interfaces()
	if err != nil {
		fmt.Println(err)
		return ""
	}
	var strs []string
	for _, i := range ifaces {
		addrs, err := i.Addrs()
		if err != nil {
			fmt.Println(err)
			continue
		}
		for _, addr := range addrs {
			switch v := addr.(type) {
			case *net.IPNet:
				ip := v.IP
				strs = append(strs, ip.String())
			case *net.IPAddr:
				// ip := v.IP
				// strs = append(strs, ip.String())
			}
		}
	}
	for _, v := range strs {
		if strings.HasPrefix(v, "192.168.") {
			return v
		}
	}
	for _, v := range strs {
		if strings.HasPrefix(v, "10.") {
			return v
		}
	}
	for _, v := range strs {
		if strings.HasPrefix(v, "172.") {
			return v
		}
	}
	for _, v := range strs {
		if v != "127.0.0.1" && v != "::1" {
			return v
		}
	}
	return strs[0]
}
