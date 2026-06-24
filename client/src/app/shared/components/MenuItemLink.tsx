import { Button } from "@mui/material";
import type { ReactNode } from "react";
import { NavLink } from "react-router";

export default function MenuItemLink({ children, to }: { children: ReactNode, to: string }) {
    return (
        <Button component={NavLink}
            to={to}
            sx={{
                fontsize: '1.2rem',
                textDecoration: 'none',
                color: 'inherit',
                '&.active': {
                    color: 'yellow'
                }
            }}>
            {children}
        </Button>
    )
}