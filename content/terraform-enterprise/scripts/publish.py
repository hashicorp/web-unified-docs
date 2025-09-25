#!/usr/bin/env python
# -*- encoding: utf-8 -*-

import sys

START_MARKER = "CUSTOMER_FACING_START_DELIMITER"
END_MARKER = "CUSTOMER_FACING_STOP_DELIMITER"


def main():
    first_line = False
    in_publish_block = False

    for line in sys.stdin.readlines():
        line = line.rstrip()

        if not first_line:
            first_line = True
            print(line)
            print()
            continue

        if START_MARKER in line.strip():
            in_publish_block = True
            continue

        if END_MARKER in line.strip():
            in_publish_block = False
            continue

        if in_publish_block:
            ## strip attribution to issues, like -- **@user** [hashicorp/repo#id)(https://…)
            attrib_ind = line.find(" -- **@")
            if attrib_ind > 0:
                line = line[:attrib_ind]

            print(line)


if __name__ == "__main__":
    main()
