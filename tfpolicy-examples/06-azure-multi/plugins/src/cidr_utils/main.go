package main

import (
  "fmt"
  "net/netip"

  "github.com/hashicorp/terraform-policy-plugin-framework/policy-plugin/plugins"
)

func main() {
	plugins.RegisterFunction("cidr_overlaps", cidr_overlaps)
  plugins.Serve()
}

func cidr_overlaps(checkStr string, restrictedStrs []string) (bool, error) {

  checkPrefix, err := netip.ParsePrefix(checkStr)
  if err != nil {
    return false, fmt.Errorf("Invalid CIDR format")
  }

  for _, s := range restrictedStrs {
    restrictedPrefix, err := netip.ParsePrefix(s)
    if err != nil {
      continue
    }

    if checkPrefix.Overlaps(restrictedPrefix) {
      return true, nil
    }
  }

  return false, nil
}
